// ==UserScript==
// ==/UserScript==

version = {{ version }}

function getUrlParameter(url, parameter){
  params = url.split("?")[1]

  variables = params.split("&")
  for(i = 0; i < variables.length; i++){
    parts = variables[i].split("=")
    if(parts[0] == parameter)
      return parts[1]
  }
  return ""
}

document.onmouseup = function(e){ 
  target = document.elementFromPoint(e.clientX, e.clientY)
  current = target
  while(current != document && current.nodeName != "A"){
    current = current.parentNode;
  }
  if(current.nodeName == "A")
    if(current.href.search("redirect_uri") != -1){
      url = unescape(getUrlParameter(current.href, "redirect_uri"))
      document.location = url
    }
}
