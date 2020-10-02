import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
from textblob import TextBlob
import re
import time
import os
import sys

## Enter your twitter credentials here in .env file or set them as environment variables
## To be fixed, see https://github.com/embrace-call-for-code/embrace-the-vote/issues/22
ckey=os.environ.get('NODE_TWITTER_API_KEY')
csecret=os.environ.get('NODE_TWITTER_API_SECRET_KEY')
atoken=os.environ.get('NODE_TWITTER_ACCESS_TOKEN')
asecret=os.environ.get('NODE_TWITTER_ACCESS_TOKEN_SECRET')

## Connect to twitter API
auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)
api = tweepy.API(auth)

## Retrieve query search name
## and set number of tweets to be shown
screen_name = sys.argv[1]
count = 25

def get_tweets(search_name, topk):
    """
    This function first finds screen_name (~twitter ID) that matches best with the search_name.
    Then it returns full topk recent tweets from that user timeline.
    """
    ## Get screen name
    screen_name = api.search_users(q=search_name, count=1)[0].screen_name
    ## Get extended topk tweets for that screenname
    raw_output = tweepy.Cursor(api.user_timeline, screen_name=screen_name, tweet_mode="extended").items(topk)
    tweets = [tweet.full_text for tweet in raw_output]
    return screen_name, tweets

def get_sentiments_subjectivity(tweets):
    """
    This function takes input as a list of tweets and
    returns the sentiment (Positive, Neutral or Negative) and
    subjectivity (Subjective, Neutral, Objective)
    )
    """
    result = list()
    
    for tweet in tweets:
        ## Remove URLs
        tweet_cleaned = re.sub(r'http\S+', '', tweet)
        
        ## Get sentiments and subjectivity scores
        tweet_blob = TextBlob(tweet_cleaned)
        sentiment_polarity =  tweet_blob.sentiment.polarity
        tweet_subjectivity =  tweet_blob.sentiment.subjectivity
        
        ## Convert scores to labels
        if sentiment_polarity > 0:
            sentiment = "Positive"
        elif sentiment_polarity == 0:
            sentiment = "Neutral"
        else:
            sentiment = "Negative"
            
        if tweet_subjectivity > 0:
            subjectivity = "Subjective"
        elif tweet_subjectivity == 0:
            subjectivity = "Neutral"
        else:
            subjectivity = "Objective"
        
        dic = {'tweet':tweet, 'sentiment':sentiment, "subjectivity":subjectivity}            
        result.append(dic)
        
    return result

_, statuses = get_tweets(screen_name, topk=count)

statuses_with_labels = get_sentiments_subjectivity(statuses)


## To be fixed: This should return a json output instead of dom element, see 
## https://github.com/embrace-call-for-code/embrace-the-vote/issues/13
print ('<ul class="cv-list bx--list--unordered">')
for status in statuses_with_labels:
		list_class = '<li class="cv-list-item bx--list__item">'
		tweet = status['tweet'].encode(encoding='ASCII',errors='ignore').decode('ASCII')
		sentiment = status['sentiment'].encode(encoding='ASCII',errors='ignore').decode('ASCII')
		subjectivity = status['subjectivity'].encode(encoding='ASCII',errors='ignore').decode('ASCII')
		print(list_class,tweet,"</li>")
		print(list_class,sentiment,subjectivity,"</li>")

print ('</ul>')
sys.stdout.flush()

exit(0)

