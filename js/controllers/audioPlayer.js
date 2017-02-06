class AudioPlayer{


	constructor(game){
		this.game = game;
	}

	preload(){
		// Load sound effects
	    this.game.load.audio('applause', 'assets/audio/applause.mp3');
	    this.game.load.audio('hitWall', 'assets/audio/hitwall.mp3');
	    this.game.load.audio('droped', 'assets/audio/droped.mp3');
	    this.game.load.audio('hitBall', 'assets/audio/small_hit.mp3');
		this.game.load.audio('cueHitBall', 'assets/audio/cue_hit_ball.mp3');
		this.game.load.audio('fault', 'assets/audio/fault.mp3');
		this.game.load.audio('no', 'assets/audio/no.mp3');
	}

	createAudios(){
		// Create sounds
		this.music = game.add.audio('applause');
		this.hitWall = game.add.audio('hitWall');
		this.droped = game.add.audio('droped');
		this.hitBall = game.add.audio('hitBall');
		this.cueHitBall = game.add.audio('cueHitBall');
		this.fault = game.add.audio('fault');
		this.no = game.add.audio('no');
		this.editSoundsSettings();
	}
	// Set each sound settings
	editSoundsSettings(){

		this.droped.allowMultiple = true,
		this.hitWall.allowMultiple = false;
		this.hitBall.allowMultiple = false;
		this.fault.allowMultiple = false;
		this.no.allowMultiple = false;
		this.cueHitBall.allowMultiple = false;

		this.droped.volume = 0.4;
		this.hitWall.volume = 0.5;
		this.hitBall.volume = 0.3;
		this.cueHitBall.volume = 0.4;
		this.fault.volume = .01;
		this.no.volume = .3;
		
	}

	hitWallPlay(ball){
		this.hitWall.play();
	}

	hitBallPlay(ball){
		var veloX = Math.abs(ball.velocity.x);
		if(veloX < 60 ){
			return;
		}
		if( veloX > 60 &&  veloX < 140){
			this.hitBall.volume = .1;
		}else if(veloX > 140 && veloX < 280){
			this.hitBall.volume = .3;
		}else if(veloX > 280 && veloX < 500){
			this.hitBall.volume = .5;
		}else if(veloX > 500 && veloX < 900){
			this.hitBall.volume = .8;
		}else{
			this.hitBall.volume = 1;
		}
		this.hitBall.play();
	}

	dropPlay(){
		this.droped.play();
	}

	applausePlay(){
		this.applause.play();
	}

	cueHitPlay(){
		this.cueHitBall.play();
	}

	startLoop(){
		this.music.play();
	}

	stopLoop(){
		this.music.stop();
	}

	musicLoopUp(){
		this.music.volume += .1;
	}

	musicLoopDown(){
		this.music.volume -= .1;
	}

	faultPlay(){
		this.fault.play();
		this.no.play();
	}
}