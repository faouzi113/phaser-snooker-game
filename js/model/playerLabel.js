/**
*
* The label of the player that prints the name and the score of the parent player
*/
class PlayerLabel {

	constructor(game,name,index){
		this.index = index;
		this.game = game;
		this.name = name;
		this.name = this.createNameLabel();
		this.score = this.createScoreLabel();
	}

	createNameLabel(){
		var text;
		if(this.index == 1){
			text = this.game.add.text(331, 728, this.name);
		}else{
			text = this.game.add.text(604, 728, this.name);
		}
		this.setTextStyle(text,"#2c2c2c","#ffffff",3,22);
	    return text;
	}

	createScoreLabel(){
		var text;
		if(this.index == 1){
			text = this.game.add.text(170, 728, "0");
		}
		else{
			text = this.game.add.text(803, 728, "0");
		}
		this.setTextStyle(text,"#2c2c2c","#2c2c2c",0,16);
		return text;  
	}

	showFaultMessage(){
		var text;
		text = this.game.add.text(476, 240, "Fault");
		this.setTextStyle(text,"#9F0505","#f8f8f8",3,72);
		setTimeout(function() {
			text.kill()}, 
			2000);
		return text;  
	}

	// Set player state to actvie
	createActiveLabel(){
		if(this.index == 1){
			this.active = game.add.sprite(29, 676, "activeLeft");
		}else{
			this.active = game.add.sprite(724, 676, "activeRight");
		}
	}

	killActiveLabel(){
		if(this.active){
			this.active.kill();
		}
	}

	setTextStyle(text,fill,stroke,thickness,size){
		//	Center align
	    text.anchor.set(0.5);
	    text.align = 'center';

	    //	Font style
	    text.font = 'Elemental End';
	    text.fontSize = size;
	    text.fontWeight = 'bold';

	    //	Stroke color and thickness
	    text.stroke = stroke;
	    text.strokeThickness = thickness;
	    text.fill = fill;
	}

	// set the label score text
	updateScore(score){
		console.log(score);
		if(score =! null)
			this.score.setText(score+0);
		else{
			this.score.setText("0");
		}
	}

	// set the label text
	setName(name){
		if(score =! null)
			this.name.setText(score);
		else{
			this.name.setText("player");
		}
	}
}
