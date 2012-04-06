// ==UserScript==
// ==/UserScript==


var parseXml = function(xmlStr){
  return(new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
}

dictDiv = document.createElement('div');
dictDiv.id = 'ZM-augmented-div';
document.getElementsByTagName('body')[0].appendChild(dictDiv);

head = document.getElementsByTagName('head')[0];
link = document.createElement('style');
link.type = 'text/css';
link.id = "zm-styles";
head.appendChild(link);

currentDef = 0;

function displayDefinition(text){
  apikey = "ukxldjne16v5lt0vro3ncmjnlwzs8td3eborub6vi1"
  url = "http://api-pub.dictionary.com/v001?vid=" + apikey + "&type=define&q="

  GM_xmlhttpRequest ( {
        method:     "GET",
        url:        url + text,
        onload:     function (response) {
          hideDiv(currentDef);

          text = parseXml(response.responseText);
          def = text.getElementsByTagName("def")[0].childNodes[0].data;
          div = document.getElementById('ZM-augmented-div');
          div.innerHTML = def;

          style = document.getElementById('zm-styles');
          style.innerHTML = popupstyles;

          currentDef += 1;

          setTimeout(hideDiv, 3000, [currentDef]);
        }
  } );
}

function hideDiv(def){
  if(def == currentDef){
    div = document.getElementById('ZM-augmented-div');
    div.innerHTML = '';

    style = document.getElementById('zm-styles');
    style.innerHTML = '';
  }
}

window.onmouseup = function(){
  if(window.getSelection() != ""){
    displayDefinition(window.getSelection())
  }
}

popupstyles = ""
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://static.zmbush.com/augment/styles.css',
  onload: function(response){
    popupstyles = response.responseText;
  }
});