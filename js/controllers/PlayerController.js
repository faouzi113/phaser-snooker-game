class PlayerController{
	this.players = null;
	constructor(){
		this.players = [];
	}

	createPlayer(name){
		var player = new Player(name);
	}
}