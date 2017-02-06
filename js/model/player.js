/*
*
* THe snooker player
*/

class Player {

	constructor(game,name,index,audio){
		this.game;
		this.name = name;
		this.score = 0;
		this.index = index;
		this.label = new PlayerLabel(game,name,index);
		this.enabled = false;
		this.audio = audio;
	}

	update(score){
		if(score>0){
			this.score += score;
			this.label.updateScore(this.score+" pts");			
		}
	}

	enable() {
		this.enabled = true;
		this.label.createActiveLabel();
	};

	disable() {
		this.enabled = false;
		this.label.killActiveLabel();
	};

	fault(){
		this.label.showFaultMessage();
		this.audio.faultPlay();
	};
}