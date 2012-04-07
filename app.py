import os
import xml.dom.minidom
import urllib
import json

import flask

app = flask.Flask(__name__)
app.debug = True
flask.use_debugger = True

@app.route('/info/<word>')
def define(word):
  apikey = "ukxldjne16v5lt0vro3ncmjnlwzs8td3eborub6vi1"
  url = "http://api-pub.dictionary.com/v001?vid=" + apikey +              \
        "&type=define&q="
  contents = urllib.urlopen(url + word).read()
  dom = xml.dom.minidom.parseString(contents);
  definitions = dom.getElementsByTagName("def");
  retval = "<b>" + word + "</b><br />"
  display = False
  i = 1
  for definition in definitions:
    display = True
    retval += "%d) %s<br />" % (i, definition.childNodes[0].data)
    i += 1
  if display:
    return retval
  else:
    return ""
 
if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
