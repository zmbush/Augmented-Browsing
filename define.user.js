// ==UserScript==
// ==/UserScript==

var parseXml = function(xmlStr){
  return(new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
}

function displayDefinition(text){
  apikey = "ukxldjne16v5lt0vro3ncmjnlwzs8td3eborub6vi1"
  url = "http://api-pub.dictionary.com/v001?vid=" + apikey + "&type=define&q="

  GM_xmlhttpRequest ( {
        method:     "GET",
        url:        url + text,
        onload:     function (response) {
          text = parseXml(response.responseText);
          def = text.getElementsByTagName("def")[0].childNodes[0].data;
          alert(def);
        }
  } );
}


window.onmouseup = function(){
  if(window.getSelection() != ""){
    displayDefinition(window.getSelection())
  }
}
