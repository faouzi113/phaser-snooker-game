class SnookerGraphics {
	constructor(game){
		this.game = game;
	}

	preload(){
		// load sooker game images
		this.game.load.image('background','assets/table.png');
		this.game.load.image('cover','assets/cover.png');
		this.game.load.image('bg','assets/bg.jpg');
		this.game.load.image('gap','assets/gap.png');
		this.game.load.image('score','assets/score.png');
		this.game.load.image('activeLeft','assets/active_left.png');
		this.game.load.image('activeRight','assets/active_right.png');
		// load data files
		this.game.load.physics('physicsData', 'assets/physics/edges.json');
		this.game.load.physics('gcData', 'assets/physics/gc.json');
		// load balls images
	    this.game.load.spritesheet('white', 'assets/white.png', 31, 31);
	    this.game.load.spritesheet('red', 'assets/red.png', 31,32);
	    this.game.load.spritesheet('green', 'assets/green.png', 31,32);
	    this.game.load.spritesheet('pink', 'assets/pink.png', 31,32);
	    this.game.load.spritesheet('brown', 'assets/brown.png', 31,32);
	    this.game.load.spritesheet('blue', 'assets/blue.png', 31,32);
	    this.game.load.spritesheet('yellow', 'assets/yellow.png', 31,32);
	    this.game.load.spritesheet('black', 'assets/black.png', 31,32);
	    this.game.load.image('colored','assets/colored.png');
	    // load cue image
	    this.game.load.spritesheet('cue', 'assets/cue.png', 694,20);
	}

	updateLine(){
		this.drawLine(this.white.sprite.x,this.white.sprite.y);
	}

	clearLine(){
		this.paint.clear();
	}

	createPaint(){
	    this.paint = this.game.add.bitmapData(918-65,442-65);
	    this.paint.ctx.strokeStyle = "#f8f8f8";
	    this.game.add.sprite(65, 65, this.paint); 
	}

	createCollisionGroups(){
		this.ballsCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.coloredBallsCollisionGroup = this.game.physics.p2.createCollisionGroup();
	    this.whiteBallCollisionGroup = this.game.physics.p2.createCollisionGroup();
	    this.ledgesCollisionGroup = this.game.physics.p2.createCollisionGroup();
	    this.gapsCollisionGroup = this.game.physics.p2.createCollisionGroup();
	    this.stickCollisionGroup = this.game.physics.p2.createCollisionGroup();
	}

	createBalls(){
		// white ball
		this.white = new Ball(240,240,'white',this.whiteBallCollisionGroup);
		// colored balls
		this.green = new Ball(243+30 ,140+30,'green',this.coloredBallsCollisionGroup);
		this.pink = new Ball(628+30 ,217+30,'pink',this.coloredBallsCollisionGroup);
		this.brown = new Ball(243+30, 220+30,'brown',this.coloredBallsCollisionGroup);
		this.blue = new Ball(452 +30,217+30,'blue',this.coloredBallsCollisionGroup);
		this.yellow = new Ball(243+30, 305+30,'yellow',this.coloredBallsCollisionGroup);
		this.black = new Ball(816+30 ,217+30,'black',this.coloredBallsCollisionGroup);
		this.coloredBalls = [this.green,this.pink,this.brown,this.blue,this.yellow,this.black];
		// red balls
		var positions = [{"x":837,"y":359},
    					{"x":864,"y":345},{"x":864,"y":375.5},
    					{"x":891.25,"y":330.25},{"x":891.25,"y":360.5},{"x":891.25,"y":392},
    					{"x":918.5,"y":318},{"x":918.5,"y":348.25},{"x":918.5,"y":379.75},{"x":918.5,"y":410.25},
    					{"x":946.5,"y":299},{"x":946.5,"y":329.25},{"x":946.5,"y":360.5},{"x":946.5,"y":390.75},{"x":946.5,"y":422}];
	    this.redBalls = [];

	    for (var i = 0; i < positions.length; i++)
	    {
	    	this.redBalls[i] = new Ball(positions[i].x-148, positions[i].y-113, 'red',this.ballsCollisionGroup);
	    }

	    this.target = this.createTarget('white');
	    
	}

	getWhite(){
		return this.white;
	}

	getRedBalls(){
		return this.redBalls;
	}

	getColoredBalls(){
		return this.coloredBalls;
	}

	resetBall(ball){
		switch(ball){
			case "green": this.green.sprite.reset(this.green.x ,this.green.y);
			break;
			case "pink": this.pink.sprite.reset(this.pink.x ,this.pink.y);
			break;
			case "brown": this.brown.sprite.reset(this.brown.x ,this.brown.y);
			break;
			case "blue": this.blue.sprite.reset(this.blue.x ,this.blue.y);
			break;
			case "yellow": this.yellow.sprite.reset(this.yellow.x ,this.yellow.y);
			break;
			case "black": this.black.sprite.reset(this.black.x ,this.black.y);
			break;
			case "white": this.white.sprite.reset(this.white.x ,this.white.y);
			break;
		}
	}

	createTarget(color){
		var target = game.add.sprite(472, 728, color);
		target.anchor.set(.5);
		return target;
	}

	setTarget(color){
		if(color != this.target.key){
			this.target.kill();
			this.target = null;
			this.target = this.createTarget(color);
		}
	}

	createLedges(){
		// Create ledge sprite from background image already loaded in preload method 
		this.ledgeSprite = this.game.add.sprite(0,0,'background'); 

		// To make this sprite using p2 physics, we should 'enableBody' for this object
		this.game.physics.p2.enableBody(this.ledgeSprite,true);
		// Sprites are positioned according to their center point, so we need to move them to the top left point.
		this.ledgeSprite.body.x = this.ledgeSprite.width/2;
		this.ledgeSprite.body.y = this.ledgeSprite.height/2;

		// Ledges don't need to be moved after collision, so we set their bodies to static/kinematic 
		this.ledgeSprite.body.static = true;
		// Clear body shapes if this one has already yet.
		this.ledgeSprite.body.clearShapes();
		// Draw ledges polygons defined in json file
	    this.ledgeSprite.body.loadPolygon('physicsData', 'edges');
	    this.ledgeSprite.body.loadPolygon('gcData', 'table');
		
		// Define which group this sprite will belongs to
		this.ledgeSprite.body.setCollisionGroup(this.ledgesCollisionGroup);
		// Make collision effect when this object collides with every sprite belonging in one of the groups below
		this.ledgeSprite.body.collides([this.ballsCollisionGroup,this.whiteBallCollisionGroup,this.coloredBallsCollisionGroup]);

		this.createBackground();
	}

	createGaps(){
		// Define gaps positions 
		var gapsPosisiotns = [{"x":196,"y":180},{"x":627,"y":164},{"x":1066,"y":180},
	    						{"x":196,"y":577},{"x":627,"y":585},{"x":1066,"y":577}];
	    	
	    for (var i = 0; i < gapsPosisiotns.length; i++)
	    {
	    	var gap = game.add.sprite(gapsPosisiotns[i].x-136, gapsPosisiotns[i].y-120, 'gap');
	    	game.physics.p2.enable(gap);
	    	gap.body.setCircle(25/2);
	    	gap.body.setCollisionGroup(this.gapsCollisionGroup);
	        gap.body.collides([this.ballsCollisionGroup,this.whiteBallCollisionGroup,this.coloredBallsCollisionGroup]);
	        gap.body.static = true;
	        gap.visible = false;
	    }
}

	createBackground(){

		this.bg = this.game.add.tileSprite(0, 0, game.world.width,game.world.height, 'bg');
	    this.background = this.game.add.tileSprite(0, 0, 983,613, 'background');
	    this.background.inputEnabled = true;
	    this.cover = this.game.add.sprite(145, 536, 'cover'); 
	    this.scorePanel = this.game.add.sprite(10, 658, 'score');
	}

	createCue(){
		this.cue = this.game.add.sprite(this.white.x , this.white.y, 'cue');
		this.game.physics.p2.enableBody(this.cue,false);
		this.cue.x += this.cue.width/2;
		this.cue.y += this.cue.height/2;
		this.cue.body.kinematic = true;
		this.cue.pivot.x = this.cue.width/2+this.white.sprite.width/2+15;
		return this.cue;
	}

	drawLine(x,y){
		var pointerX = this.game.input.mousePointer.x;
		var pointerY = this.game.input.mousePointer.y;

		if(pointerX > 0 && pointerX < 983 && pointerY > 0 && pointerY < 680 ){
			var angle = Math.atan2(pointerY - this.white.sprite.y, pointerX - this.white.sprite.x);
			if(!this.cue.alive){
				this.cue.reset(this.white.sprite.x,this.white.sprite.y);
			}
			this.cue.body.rotation = angle;
		} 

	    this.paint.clear();
		this.paint.ctx.beginPath();
		this.paint.ctx.strokeStyle = '#f8f8f8';
		this.paint.ctx.moveTo(x-65, y-65);
		this.paint.ctx.lineTo(pointerX-65, pointerY-65);
		this.paint.ctx.lineWidth = 2;

		this.paint.ctx.stroke();
		this.paint.ctx.beginPath();
		this.paint.ctx.strokeStyle = '#FF2800'
		this.paint.ctx.arc(pointerX-65, pointerY-65, 15, 0, 360);
		this.paint.ctx.stroke();
		this.paint.ctx.closePath();
		this.paint.render();  
	}

	

	


}