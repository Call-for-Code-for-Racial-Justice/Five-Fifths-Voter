from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator('wXf8TZ6IMvBOuIZoxCwj0Z1Jb6kYevft_F5AIBQK61bM')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/4c1b9d2a-c6f9-41da-be53-43c361d6f5c2')
tones = tone_analyzer.tone(
    {'text': "Workplace automation + pandemic is hitting the careers of women much more then men. Thanks to the insightful attendees at Denver Startup week + the amazing Avery and the rest of my colleagues at CPR.https://t.co/hp1xO2snH9 @ColoradoMatters, @averylill"},
    content_type='application/json').get_result()

print(tones)
