import tweepy
from tweepy import OAuthHandler
import re
import os
import json
import concurrent.futures
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import ApiException
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson import ToneAnalyzerV3
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions, EmotionOptions, ConceptsOptions
from flask.logging import logging

logger = logging.getLogger()


class Chatter:
    def __init__(self, twitter_api, nlu_api_key, nlu_api_url,
                 tone_analyzer_api_key,
                 tone_analyzer_api_url):

        self.twitter_api = twitter_api

        # Connect to IBM Watson tone analyzer API
        ta_authenticator = IAMAuthenticator(tone_analyzer_api_key)
        self.tone_analyzer = ToneAnalyzerV3(
            version='2017-09-21',
            authenticator=ta_authenticator
        )
        self.tone_analyzer.set_service_url(tone_analyzer_api_url)

        # Connect to IBM Watson NLU API
        nlu_authenticator = IAMAuthenticator(nlu_api_key)
        self.natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2020-08-01',
            authenticator=nlu_authenticator
        )
        self.natural_language_understanding.set_service_url(nlu_api_url)

    def get_tweets(self, search_name, top):
        """from ibm_watson import ApiException
        This function first finds screen_name (~twitter ID) that matches best with the search_name.
        Then it returns top recent tweets (excluding retweets and replies) from that user timeline.
        """
        # Get screen name
        screen_name = self.twitter_api.search_users(
            q=search_name, count=1)[0].screen_name
        # Get extended top tweets for that screenname excluding retweets and replies
        raw_output = tweepy.Cursor(self.twitter_api.user_timeline,
                                   screen_name=screen_name,
                                   tweet_mode="extended",
                                   include_rts=False,
                                   exclude_replies=True).items(top)
        tweets = [tweet.full_text for tweet in raw_output]
        return screen_name, tweets

    def get_nlu_tone_analysis(self, tweet):
        """
        This function takes input as a tweet and
        returns their sentiment (Positive, Neutral or Negative),
        concepts (high level concepts or ideas),
        emotions (anger, disgust, fear, joy, or sadness),
        and tones (emotional and language tone)
        """
        # Encode ASCII
        tweet = tweet.encode(encoding='ASCII', errors='ignore').decode('ASCII')
        # Remove URLs
        tweet_cleaned = re.sub(r'http\S+', '', tweet)
        if tweet_cleaned:
            try:
                # Call NLU API
                nlu_analysis = self.natural_language_understanding.analyze(
                    text=tweet_cleaned, language='en',
                    features=Features(
                        concepts=ConceptsOptions(limit=2),
                        sentiment=SentimentOptions(),
                        emotion=EmotionOptions())).get_result()

                concepts = ', '.join([concept['text']
                                     for concept in nlu_analysis['concepts']])
                sentiment = nlu_analysis['sentiment']['document']['label']
                emotions = nlu_analysis['emotion']['document']['emotion']
                dominant_emotion = max(emotions, key=emotions.get)

            except ApiException as ex:
                logger.warning("Error from Watson NLU. code " +
                               str(ex.code) + ": " + ex.message)
                concepts = 'concepts could not be found'
                sentiment = ''
                emotions = ''
                dominant_emotion = ''

            except Exception as nluErr:
                logger.warning("Error from Watson NLU", nluErr.args)
                concepts = 'concepts could not be found'
                sentiment = ''
                emotions = ''
                dominant_emotion = ''

            try:
                # Call tone analyzer API
                tone_analysis = self.tone_analyzer.tone(
                    {'text': tweet_cleaned},
                    content_type='text'
                ).get_result()

                tones = ', '.join(
                    [tone['tone_name'] for tone in tone_analysis['document_tone']['tones']])
            except ApiException as ex:
                logger.warning(
                    "Error from Watson Tone Analyzer code " + str(ex.code) + ": " + ex.message)
                tones = 'message tone could not be found'

            except Exception as taErr:
                logger.warning("Error from Watson Tone Analyzer", taErr.args)
                tones = 'message tone could not be found'

            # Create result table
            result = {'tweet': tweet, 'sentiment': sentiment, "emotion": dominant_emotion,
                      'concepts': concepts, 'tones': tones}
        else:
            result = {'tweet': tweet, 'sentiment': '', "emotion": '',
                      'concepts': '', 'tones': ''}

        return(result)

    # Code for dynamically generating wordcloud
    # This has to be called from the front end or the main
    # function of this script and
    # the plot has to be saved at a path for the
    # front end to collect it and display.
    def clean_tweets_for_wordcloud(self, tweets):
        # Join all tweets
        tweets = ' '.join(tweets)
        # remove URLs
        tweets = re.sub(r'http\S+', '', tweets)
        return tweets


def get_some_tweets(search_name):
    # Are we deployed in production?
    try:
        vcap_env = os.environ.get('VCAP_SERVICES')
        if vcap_env != None:
            logger.info("chatter production")
            vcap = json.loads(vcap_env)

            # Get Twitter vars from VCAP_SERVICES
            for service in vcap['user-provided']:
                if service["instance_name"] == "five-fifths-twitter":
                    twitter_api_key = service["credentials"]["apikey"]
                    twitter_secret = service["credentials"]["secretkey"]
                    twitter_token = service["credentials"]["access_token"]
                    twitter_token_secret = service["credentials"]["access_token_secret"]

            # Get NLU vars from the VCAP_SERVICES
            for service in vcap['natural-language-understanding']:
                if service["instance_name"] == "Five Fifths Natural Language Understanding":
                    nlu_api_key = service["credentials"]["apikey"]
                    nlu_api_url = service["credentials"]["url"]

            # Get Tone Analyzer vars from VCAP_SERVICES
            for service in vcap['tone_analyzer']:
                if service["instance_name"] == "Five Fifths Tone Analyzer":
                    tone_analyzer_api_key = service["credentials"]["apikey"]
                    tone_analyzer_api_url = service["credentials"]["url"]

        # Hopefully the local dev environment is setup
        else:
            logger.warning("chatter development only")
            # Enter your twitter credentials here in .env file or set them as environment variables
            twitter_api_key = os.environ.get('TWITTER_API_KEY')
            twitter_secret = os.environ.get('TWITTER_API_SECRET_KEY')
            twitter_token = os.environ.get('TWITTER_ACCESS_TOKEN')
            twitter_token_secret = os.environ.get(
                'TWITTER_ACCESS_TOKEN_SECRET')

            # Enter your IBM Watson NLU api and tone analyzer credentials here in .env file or set them as environment variables
            nlu_api_key = os.environ.get('NLU_API_KEY')
            nlu_api_url = os.environ.get('NLU_API_URL')
            tone_analyzer_api_key = os.environ.get('TA_API_KEY')
            tone_analyzer_api_url = os.environ.get('TA_API_URL')

        if nlu_api_key == None or nlu_api_url == None:
            raise Exception("NLU credentials not defined")

        if twitter_api_key == None or twitter_secret == None or twitter_token == None or twitter_token_secret == None:
            raise Exception("Twitter credentials not defined")

        if tone_analyzer_api_key == None or tone_analyzer_api_url == None:
            raise Exception("Tone Analyzer credentials not defined")

        logger.debug("Twitter access details: key: %s, secret: %s, token: %s, secret: %s" % (
            twitter_api_key, twitter_secret, twitter_token, twitter_token_secret))

        logger.debug("NLU access details: key: %s, url: %s" %
                       (nlu_api_key, nlu_api_url))

        logger.debug("Tone access details: key: %s, url: %s" %
                     (tone_analyzer_api_key, tone_analyzer_api_url))

        # Connect to twitter API
        auth = OAuthHandler(twitter_api_key, twitter_secret)
        auth.set_access_token(twitter_token, twitter_token_secret)
        api = tweepy.API(auth)

        chatter = Chatter(api, nlu_api_key, nlu_api_url,
                          tone_analyzer_api_key, tone_analyzer_api_url)

        # set number of tweets to be shown
        count = 5
        screen_name, tweets = chatter.get_tweets(search_name, top=count)

        # Run multiple threads to call NLU and tone analyzer API
        with concurrent.futures.ThreadPoolExecutor(max_workers=count) as executor:
            futures = [executor.submit(
                chatter.get_nlu_tone_analysis, tweet) for tweet in tweets]
            concurrent.futures.wait(futures)

        # Fetch the results in the output dictionary
        items = [res.result() for res in futures]
        output_dict = {"screen_name": screen_name, "items": items}

        # Print the output json
        logger.debug(json.dumps(output_dict, indent=2))
        return output_dict

    except Exception as err:
        return_msg = {"ok": False}
        if isinstance(err.args[0], str):
            return_msg["message"] = err.args[0]
        else:
            return_msg["message"] = "exception"
        return return_msg
