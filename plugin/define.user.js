// ==UserScript==
// ==/UserScript==

version = '1'

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
  url = "http://ab.zmbush.com/info/"

  GM_xmlhttpRequest ( {
        method:     "GET",
        url:        url + text,
        onload:     function (response) {
          if(response.responseText != ""){
            showText(response.responseText);
          }
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

function showText(txt){
  hideDiv(currentDef);
  div = document.getElementById('ZM-augmented-div');
  div.innerHTML = txt;

  style = document.getElementById('zm-styles');
  style.innerHTML = popupstyles;
  currentDef += 1;

  setTimeout(hideDiv, 10000, [currentDef]);
}

window.onmouseup = function(){
  if(window.getSelection() != ""){
    displayDefinition(window.getSelection())
  }
}

popupstyles = ""
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://ab.zmbush.com/styles.css',
  onload: function(response){
    popupstyles = response.responseText;
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://ab.zmbush.com/version',
      onload: function(response){
        if(response.responseText != version){
          showText("The define script has been updated.<br />" +               
                   "Please download it again " +
                   <a href=\"http://ab.zmbush.com/define.user.js\">here</a>)
        }
      }
    });
  }
});

