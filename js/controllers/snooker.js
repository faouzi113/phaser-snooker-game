class Snooker {
	constructor(game){
		// Game
		this.game = game;
		// graphics
		this.graphics = new SnookerGraphics(game);
		// audio player
		this.audio = new AudioPlayer(game);
		// current player index 
		// this should be 1 or 2
		this.currentPlayer = -1;
		// stop cue drawing 
		this.stopCueUpdates = false;
		// true if there any ball moving on the table
		this.isBallsMoving = false;
		// to know when should update game states 
		this.updateGame = false;
		this.gcX = 852;
		this.gcY = 556;
		// dropped colored balls or white if it was dropped
		this.ballsToReset = [];
		// the user can move the white ball
		this.whiteOnHand = true;
		// when the player drop the corrct ball
		this.keepPlayer = false;
		// the current target the player should hit
		this.target = 'white';
		this.dropTarget = false;
		this.colors = ["red","green","pink","blue","brown","yellow","black"];

	}

	preload(){
		this.graphics.preload();
		this.audio.preload();
	}

	update(){
		if(this.whiteOnHand){
			this.dragWhite();
		}else{
			if(!this.stopCueUpdates){
				this.graphics.updateLine();
				if (this.game.input.activePointer.isDown){
			        setTimeout(function() {
			        	this.snooker.audio.cueHitPlay();
						this.snooker.cue.kill();
						this.snooker.accelerateToObject(this.snooker.white.sprite,this.game.input.mousePointer,80000);
					}, 100);
					setTimeout(function() {this.snooker.updateGame = true;}, 1000);
					
					if(this.graphics.cue.x<this.white.sprite.x){
						this.graphics.cue.body.velocity.x = 400;
					}else{
						this.graphics.cue.body.velocity.x = -400;
					}
					this.stopCueUpdates = true;
					
		    	}
			}else{
				this.cue.kill();
				this.graphics.clearLine();
			}
		}
		if(!this.isBallsMoving && this.updateGame){
			this.resetBalls();
			this.updateGame = false;
			if(!this.keepPlayer){
				console.log("switch player");
				this.switchPlayer();
			}else{
				if(this.currentTarget != 'colored'){
					this.currentTarget = 'colored';
				}else if(this.currentTarget != 'red'){
					this.currentTarget = 'red';
				}
			}
			this.keepPlayer = false;
			this.dropTarget = false;
					
			this.stopCueUpdates = false;
		}
		
		
	}

	checkBallMoving(){
		for(var i = 0; i < this.allBalls.length; i++){
			if(this.allBalls[i].isMoving()){
				return true;
			}
		}
		return false;
	}

	updateBallsMovingState(){
		this.isBallsMoving = this.checkBallMoving();

	}

	createAudioPlayer(){
		this.audio.createAudios();
	}

	createPlayers(){
		this.player1 = new Player(this.game,"Faouzi",1,this.audio);
		this.player2 = new Player(this.game,"Yannik",2,this.audio);
		this.players = [this.player1,this.player2];
		this.setCurrenPlayer(1)
	}

	setCurrenPlayer(index){

		this.player1.disable();
		this.player2.disable();
		if(index-1 < this.players.length){
			this.currentPlayer = index;
			this.players[index-1].enable();	
		}
		
	}

	getCurrentPlayer(){
		if(this.currentPlayer>0 && this.currentPlayer <= this.players.length){
			return this.players[this.currentPlayer-1];
		}
	}

	switchPlayer(){
		if(this.currentPlayer == 1){
			this.setCurrenPlayer(2);
		}else{
			this.setCurrenPlayer(1);
		}
	}

	createGraphics(){
		this.graphics.createCollisionGroups();
		this.graphics.createLedges();
		this.graphics.createBalls();
		// get balls instances
		this.white = this.graphics.getWhite();
		this.redBalls = this.graphics.getRedBalls();
		this.coloredBalls = this.graphics.getColoredBalls();
		this.allBalls = this.redBalls.concat(this.coloredBalls).concat(this.white);
		// create cue
		this.cue = this.graphics.createCue();
		// create gaps
		this.graphics.createGaps();

		this.collideWhite();
		this.collideRedBalls();
		this.collideColoredBalls();
		this.graphics.createPaint();
		this.setTarget('white');
		// sprites moving state
	    game.time.events.loop(Phaser.Timer.SECOND/10000, this.updateBallsMovingState, this);
	}

	collideWhite(){
		this.white.sprite.body.collides(this.graphics.gapsCollisionGroup,this.killBall,this);
	    this.white.sprite.body.collides(this.graphics.ledgesCollisionGroup,this.hitLedge,this);
	    this.white.sprite.body.collides(this.graphics.ballsCollisionGroup,this.hitWhiteBall,this);
	    this.white.sprite.body.collides(this.graphics.coloredBallsCollisionGroup,this.hitWhiteBall,this);
	}

	collideRedBalls(){
		var redball = null;
		for(var i = 0;i < this.redBalls.length; i++){
			redball = this.redBalls[i];
			redball.sprite.body.collides(this.graphics.gapsCollisionGroup,this.killBall,this);
	    	redball.sprite.body.collides(this.graphics.ledgesCollisionGroup,this.hitLedge,this);
	    	redball.sprite.body.collides(this.graphics.ballsCollisionGroup,this.ballsHit,this);
	    	redball.sprite.body.collides(this.graphics.coloredBallsCollisionGroup,this.ballsHit,this);
	    	redball.sprite.body.collides([this.graphics.whiteBallCollisionGroup]);
		}
	}

	collideColoredBalls(){
		var ball = null;
		for(var i = 0;i < this.coloredBalls.length; i++){
			ball = this.coloredBalls[i];
			ball.sprite.body.collides(this.graphics.gapsCollisionGroup,this.killBall,this);
	    	ball.sprite.body.collides(this.graphics.ledgesCollisionGroup,this.hitLedge,this);
	    	ball.sprite.body.collides(this.graphics.ballsCollisionGroup,this.ballsHit,this);
	    	ball.sprite.body.collides(this.graphics.coloredBallsCollisionGroup,this.ballsHit,this);
	    	ball.sprite.body.collides([this.graphics.whiteBallCollisionGroup]);
		}
	}

	// callbacks
	dropWhiteBall(whiteBall,gap){
		
	}

	hitLedge(ball,ledge){
	}

	hitWhiteBall(ball,ball2){
		this.audio.hitBallPlay(ball);
	}

	killBall(ball,gap){
		ball.sprite.kill();
		var key = ball.sprite.key;
		if(key == "red"){
			this.audio.dropPlay();
			setTimeout(function() {
				ball.sprite.reset(this.gcX ,this.gcY);
				ball.velocity.x = -200;
			}, 6000);
			
		}else{
			if(key == 'white'){
				ball.sprite.kill();
				this.ballsToReset = this.ballsToReset.concat(ball);
				this.players[this.currentPlayer-1].fault();
				this.keepPlayer = false;
				this.whiteOnHand = true;
			}
			this.ballsToReset = this.ballsToReset.concat(ball);
		}
		// 
		this.updatePlayerScore(key);
	}

	updatePlayerScore(key){
		if(this.dropTarget){
			if( key != 'white'){
				var score = this.getScore(key)
				this.players[this.currentPlayer-1].update(score);
				this.keepPlayer = true;
			}
		}else{
			if(key == 'red'){
				if(this.target == 'red'){
					var score = this.getScore(key)
					this.players[this.currentPlayer-1].update(score);
					this.keepPlayer = true;
				}
			}else if(this.target == 'colored'){
				if(this.colors.indexOf(key) < -1){
					var score = this.getScore(key)
					this.players[this.currentPlayer-1].update(score);
					this.keepPlayer = true;
				}
			}
		}
	}



	getScore(color){
		if(color == "red")
			return 1;
		if(color == "green")
			return 3;
		if(color == "pink")
			return 6;
		if(color == "blue")
			return 5;
		if(color == "brown")
			return 4;
		if(color == "yellow")
			return 2;
		if(color == "black")
			return 7;
	}

	resetBalls(){
		if(this.ballsToReset.length>0){
			for(var i = 0; i< this.ballsToReset.length; i++ ){
				this.graphics.resetBall(this.ballsToReset[i].sprite.key);
			}
			this.ballsToReset = [];
		}
	}

	ballsHit (ball,ball2) {
		this.audio.hitBallPlay(ball);
	}

	accelerateToObject(obj1, obj2, speed) {
	    if (typeof speed === 'undefined') { 
	    	speed = 60; 
	    }
	    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	    obj1.body.rotation = angle + game.math.degToRad(90); 
	    obj1.body.force.x = Math.cos(angle) * speed;
	    obj1.body.force.y = Math.sin(angle) * speed;
	}

	// Allow dragin an ddroping white ball
	dragWhite(){
		this.white.sprite.inputEnabled = true;
		this.white.sprite.useHandCursor = true;
		this.white.sprite.input.enableDrag();

		this.white.sprite.events.onDragUpdate.add(this.onDragUpdate, this);
		this.white.sprite.events.onDragStop.add(this.stopDrag, this);
	}

	onDragUpdate(){
		var pointerX = this.game.input.mousePointer.x;
		var pointerY = this.game.input.mousePointer.y;
		this.white.sprite.body.x = pointerX;
		this.white.sprite.body.y = pointerY;
	}

	stopDrag(){
		this.white.sprite.inputEnabled = false;
		this.whiteOnHand = false;
		this.setTarget('red');
	}

	setTarget(color){
		this.target = color;
		this.graphics.setTarget(this.target);
	}


	
}