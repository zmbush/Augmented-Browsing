// ==UserScript==
// ==/UserScript==


var parseXml = function(xmlStr){
  return(new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
}

dictDiv = document.createElement('div');
dictDiv.className = 'ZM-augmented-div';
document.getElementsByTagName('body')[0].appendChild(dictDiv);

function displayDefinition(text){
  apikey = "ukxldjne16v5lt0vro3ncmjnlwzs8td3eborub6vi1"
  url = "http://api-pub.dictionary.com/v001?vid=" + apikey + "&type=define&q="

  GM_xmlhttpRequest ( {
        method:     "GET",
        url:        url + text,
        onload:     function (response) {
          text = parseXml(response.responseText);
          def = text.getElementsByTagName("def")[0].childNodes[0].data;
          div = document.getElementsByClassName('ZM-augmented-div')[0];
          div.innerHTML = def;
        }
  } );
}


window.onmouseup = function(){
  if(window.getSelection() != ""){
    displayDefinition(window.getSelection())
  }
}

head = document.getElementsByTagName('head')[0];
link = document.createElement('link');
link.id = 'zm-augment-css';
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://static.zmbush.com/augment/styles.css';
link.media = 'all';
head.appendChild(link);
