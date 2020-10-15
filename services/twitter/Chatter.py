import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import re
import time
import os
import sys
import json
import concurrent.futures
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features,\
SentimentOptions, EmotionOptions, ConceptsOptions
from ibm_watson import ToneAnalyzerV3
from wordcloud import WordCloud, STOPWORDS


def get_tweets(search_name, topk):
    """
    This function first finds screen_name (~twitter ID) that mathces best with the search_name.
    Then it returns topk recent tweets (excluding retweets and replies) from that user timeline.
    """
    ## Get screen name
    screen_name = api.search_users(q=search_name, count=1)[0].screen_name
    ## Get extended topk tweets for that screenname excluding retweets and replies
    raw_output = tweepy.Cursor(api.user_timeline,
                               screen_name=screen_name,
                               tweet_mode="extended",
                               include_rts=False,
                               exclude_replies=True).items(topk)
    tweets = [tweet.full_text for tweet in raw_output]
    return screen_name, tweets

def get_nlu_tone_analysis(tweet):
    """
    This function takes input as a tweet and
    returns their sentiment (Positive, Neutral or Negative),
    concepts (high level concepts or ideas),
    emotions (anger, disgust, fear, joy, or sadness),
    and tones (emotional and language tone)
    """
    ## Encode ASCII
    tweet = tweet.encode(encoding='ASCII',errors='ignore').decode('ASCII')
    ## Remove URLs
    tweet_cleaned = re.sub(r'http\S+', '', tweet)
    if tweet_cleaned:
        
        ## Call NLU API
        nlu_analysis = natural_language_understanding.analyze(
            text=tweet_cleaned, language='en',
                  features=Features(
                  concepts=ConceptsOptions(limit=2),
                  sentiment=SentimentOptions(),
                  emotion=EmotionOptions())).get_result()

        concepts = ', '.join([concept['text'] for concept in nlu_analysis['concepts']])
        sentiment = nlu_analysis['sentiment']['document']['label']
        emotions = nlu_analysis['emotion']['document']['emotion']
        dominant_emotion = max(emotions, key=emotions.get)
        
        ## Call tone analyzer API
        tone_analysis = tone_analyzer.tone(
                {'text': tweet_cleaned},
                content_type='text'
        ).get_result()

        tones = ', '.join([tone['tone_name'] for tone in tone_analysis['document_tone']['tones']])
        
        ## Create result table
        result = {'tweet':tweet, 'sentiment':sentiment, "emotion":dominant_emotion,
              'concepts':concepts, 'tones':tones}
    else:
        result = {'tweet':tweet, 'sentiment':'', "emotion":'',
              'concepts':'', 'tones':''}
        
    return(result)

## Code for dynamically generating wordcloud
## This has to be called from the front end or the main
## function of this script and 
## the plot has to be saved at a path for the
## front end to collect it and display.
def clean_tweets_for_wordcloud(tweets):
    ## Join all tweets
    tweets = ' '.join(tweets)
    ## remove URLs
    tweets = re.sub(r'http\S+', '', tweets)
    return tweets

def plot_cloud(wordcloud):
    plt.figure(figsize=(40, 30))
    plt.imshow(wordcloud) 
    plt.axis("off")
    plt.savefig("PATH")

if __name__ == "__main__":

    ## Enter your twitter credentials here in .env file or set them as environment variables
    ckey=os.environ.get('NODE_TWITTER_API_KEY')
    csecret=os.environ.get('NODE_TWITTER_API_SECRET_KEY')
    atoken=os.environ.get('NODE_TWITTER_ACCESS_TOKEN')
    asecret=os.environ.get('NODE_TWITTER_ACCESS_TOKEN_SECRET')

    ## Enter your IBM Watson NLU api and tone analyzer credentials here in .env file or set them as environment variables
    nlu_api_key = os.environ.get('NODE_NLU_API_KEY')
    nlu_api_url = os.environ.get('NODE_NLU_API_URL')

    tone_analyzer_api_key = os.environ.get('NODE_TA_API_KEY')
    tone_analyzer_api_url = os.environ.get('NODE_TA_API_URL')

    ## Connect to twitter API
    auth = OAuthHandler(ckey, csecret)
    auth.set_access_token(atoken, asecret)
    api = tweepy.API(auth)

    ## Connect to IBM Watson NLU API
    nlu_authenticator = IAMAuthenticator(nlu_api_key)
    natural_language_understanding = NaturalLanguageUnderstandingV1(
		    version='2020-08-01',
		    authenticator=nlu_authenticator
    )
    natural_language_understanding.set_service_url(nlu_api_url)

    ## Connect to IBM Watson tone analyzer API
    ta_authenticator = IAMAuthenticator(tone_analyzer_api_key)
    tone_analyzer = ToneAnalyzerV3(
		    version='2017-09-21',
		    authenticator=ta_authenticator
    )
    tone_analyzer.set_service_url(tone_analyzer_api_url)


    ## Retrieve query search name
    ## and set number of tweets to be shown
    search_name = sys.argv[1]
    count = 25
		
    screen_name, tweets = get_tweets(search_name, topk=count)

    ## Run multiple threads to call NLU and tone analyzer API
    with concurrent.futures.ThreadPoolExecutor(max_workers=count) as executor:
		    futures = [executor.submit(get_nlu_tone_analysis, tweet) for tweet in tweets]
		    concurrent.futures.wait(futures)

    ## Fetch the results in the ouptut dictionary
    items = [res.result() for res in futures]
    output_dict = {"screen_name":screen_name, "items":items}

    ## Print the output json
    print(json.dumps(output_dict))
    sys.stdout.flush()

    exit(0)
