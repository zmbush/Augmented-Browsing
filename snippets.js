// Change the link location of every link on a page
links = document.getElementsByTagName("a")
for(i = 0; i < links.length; i++){
  links[i].href = "http://a.new.url/";
}

// Add event listners to highlight thing we hover over
items = document.getElementsByTagName("*")
insideOf = new Array()
currentlyHighlighted = null
for(i = 0; i < items.length; i++){ 
  items[i].onfocus = function(event){ 
    console.log(this)
    insideOf.push(this)
    if(currentlyHighlighted != null)
      currentlyHighlighted.style.border = ""
    this.style.border = "1px solid red"
    currentlyHighlighted = this
  }
  /*
  items[i].onblur = function(event){
    // if(currentlyHighlighted != null)
      // currentlyHighlighted.style.border = ""
    if(insideOf.length > 0){
      currentlyHighlighted = insideOf[insideOf.length - 1]
      if(currentlyHighlighted != null)
        currentlyHighlighted.style.border = "1px solid red"
    }
  }
  */
}

document.onmouseup = function(e){ 
  target = document.elementFromPoint(e.clientX, e.clientY)
  current = target
  target.style.border = "1px solid green"; 
  while(current != document && current.nodeName != "A"){
    console.log(current)
    current = current.parentNode;
  }
  if(current.nodeName == "A")
    if(current.href.search("redirect_uri") != -1)
      document.location = "http://www.zmbush.com"
    else
      document.location = current.href
}




