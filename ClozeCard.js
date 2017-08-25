var ClozeCard = function(text, cloze){
  // check if cloze in text
  if(text.indexOf(cloze)<0){
    return console.log("Error: ", cloze , " doesn't appear in ", text);
  }

  this.cloze = cloze;
  this.fullText = text;
  
  var regEx = new RegExp(cloze,"g");
  this.partial = text.replace(regEx, "...");
}

module.exports = ClozeCard;
