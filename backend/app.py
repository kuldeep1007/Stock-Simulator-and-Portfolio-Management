import nsetools as ns
from flask import Flask, request
from flask_restful import Resource, Api
import json
from flask import jsonify
import os

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/stock/<stock>": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)
api = Api(app)
'''
class Stock(Resource):
    def get(self, stock):
        nse=Nse()
        s= nse.get_quote(stock,as_json=False)
        return jsonify(s)
'''

@app.route("/stock/<stock>")
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get(stock):
    try:
        # print(ns)
        nse=ns.Nse()
        print(nse)
        s= nse.get_quote(stock)
        #print(s)
        return jsonify(s)
    except OSError as err:
        print("OS error: {0}".format(err))
        return "<h1>hiiiii</h1>"

@app.route("/") 
def home_view(): 
    return "<h1>Welcome</h1>"

#api.add_resource(Stock, '/stock/<stock>')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(port=port)
