import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time
import os.path
import sys

ckey='q93BIFM00HTShp1HlwzdRtK0e'
csecret='RbANDPFCzbBuOCLB0F4AStxBBnGs3xeopTKj7SiUVpqP6zblhn'
atoken='363546023-X897MAtGnBEq7vJjLtEgUyQtVMCxMDdw6hhQNnDl'
asecret='3PAQg91fmCIBP4SdSMg2cEe7lKc1VozS6Dg35NZy3Gjbq'

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

