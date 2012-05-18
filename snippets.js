// Change the link location of every link on a page
links = document.getElementsByTagName("a")
for(i = 0; i < links.length; i++){
  links[i].href = "http://a.new.url/";
}

// Add event listners to highlight thing we hover over
items = document.getElementsByTagName("*")
for(i = 0; i < items.length; i++){ 
  items[i].onmouseover = function(event){ 
    this.style.border = "1px solid red"
  }
  items[i].onmouseout = function(event){
    this.style.border = ""
  }
}
