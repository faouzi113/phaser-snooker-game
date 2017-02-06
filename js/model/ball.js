/**
*
* class for the snooker balls.
* This class has : 
* 	- position defined by x and y attributes and a type
* 	- type which is the key of the ball like red,white,pink,green ...
*	- group which this ball belongs to
*
*/

class Ball{
	// the sprite created for this ball
	constructor(x, y, type, group){
		this.x = x;
		this.y = y;
		this.type = type;
		var ball = game.add.sprite(x, y, type);
    	game.physics.p2.enable(ball,false);
    	ball.body.setCircle(30/2);
    	ball.body.setCollisionGroup(group);
    	this.sprite = ball;
	}

	isMoving(){
		//console.log(Math.abs(this.sprite.body.velocity.x) + " ,"+ Math.abs(this.sprite.body.velocity.y));
		if (Math.abs(this.sprite.body.velocity.x) > 3 && Math.abs(this.sprite.body.velocity.y) > 3) {
			if(this.sprite.body.velocity.x>1)
				this.sprite.body.velocity.x -= .3;
			if(this.sprite.body.velocity.y>1)
				this.sprite.body.velocity.y -= .3;
			if(this.sprite.body.velocity.x<1)
				this.sprite.body.velocity.x += .3;
			if(this.sprite.body.velocity.y<1)
				this.sprite.body.velocity.y += .3;
			return true;
		}else{
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
			return false;
		}
	}
}