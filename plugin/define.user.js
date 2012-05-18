// ==UserScript==
// ==/UserScript==

version = {{ version }}

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
          if(response.status == 200){
            if(response.responseText != ""){
              showText(response.responseText);
            }
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

/*
function addJQuery(callback) {
  var script = document.createElement("script");
  url = ("https:" == document.location.protocol) ? "https://" : "http://"
  url += "ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
  script.setAttribute("src", url);
  script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
      }, false);
  document.body.appendChild(script);
}*/

popupstyles = ""
GM_xmlhttpRequest({
  method: "GET",
  url: "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
  onload: function(response){
    alert(response.responseText)
    //eval(response.responseText)
  }
}
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
                   "<a href=\"http://ab.zmbush.com/define.user.js\">here</a>")
        }
      }
    });
  }
});

/*function main(){
  // Run JQuery stuff here
}

addJQuery(main);*/
