from flask import Flask
from flask import request

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)

    from . import Chatter

    # a simple page that says hello
    @app.route('/chatter')
    def hello():
        try:
            screen_name = request.args.get('screenname')
            return Chatter.get_some_tweets(screen_name)
        except Exception as e:
            return {"error": { "message": "could not get tweets"}}

    return app