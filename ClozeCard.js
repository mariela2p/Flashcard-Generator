var ClozeCard = function(text, cloze){
	 this.text = text.split(cloze);
    this.cloze = cloze;
}

module.exports = ClozeCard;
