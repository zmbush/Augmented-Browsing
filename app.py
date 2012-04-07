import os
import xml.dom.minidom
import urllib
import json

from flask import Flask

app = Flask(__name__)

@app.route('/info/<word>')
def define(word):
  apikey = "ukxldjne16v5lt0vro3ncmjnlwzs8td3eborub6vi1"
  url = "http://api-pub.dictionary.com/v001?vid=" + apikey +              \
        "&type=define&q="
  contents = urllib.urlopen(url + word).read()
  dom = xml.dom.minidom.parseString(contents);
  return json.dumps(dom)
 
if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
