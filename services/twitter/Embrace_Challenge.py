import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time
import os.path
import sys

ckey='YOUR_KEY_HERE'
csecret='YOUR_SECRET_HERE'
atoken='YOUR_TOKEN_HERE'
asecret='YOUR_TOKEN_SECRET_HERE'

auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

api = tweepy.API(auth)

screen_name = sys.argv[1]

count = 25

statuses = api.user_timeline(screen_name, count=count)

print ('<ul class="cv-list bx--list--unordered">')
for status in statuses:
    print('<li class="cv-list-item bx--list__item">',status.text.encode(encoding='ASCII',errors='ignore').decode("ASCII"),"</li>")
print ('</ul>')
sys.stdout.flush()

exit(0)

