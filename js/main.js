/**
* @author       Faouzi BIDI <faouzi.bidi@hardis.fr>
*
* @overview
*
* Phaser snooker
*
* v1.0.0 "First build" - Built: Fri Aug 26 2016 01:02:57
*
* By Faouzi Bidi
*
* Phaser snooker is a fun pool game, using Phaser framework for desktop and mobile web browsers, supporting Canvas and WebGL rendering.
*
* PoolGame uses Phaser.js for rendering
* PoolGame uses p2.js for full-body physics.
*
*/
var game = new Phaser.Game(1080,860,Phaser.AUTO);
var snooker = new Snooker(game);

var GameState = {
	preload:function(){
		snooker.preload();
	},
	create:function(){
		//  In this game we should use P2 physics, so we should enable it
	    game.physics.startSystem(Phaser.Physics.P2JS);
	    // set the value of velocity of sprites
    	game.physics.p2.restitution = 0.5;
    	// We would like to use collision impact, so we enable impact events 
    	// Without this method no callback event will be fired
    	game.physics.p2.setImpactEvents(true);

    	game.physics.p2.updateBoundsCollisionGroup();
		// Enable keyboard inputs 
	    cursors = game.input.keyboard.createCursorKeys();

	    snooker.createGraphics();
    	snooker.createAudioPlayer();
    	snooker.createPlayers();	
    	//snooker.getCurrentPlayer().fault();

		
	},
	update:function(){
		//snooker.graphics.white.sprite.body.velocity.x = 1200;
		snooker.update();

	},
	render:function(){

	}
}

game.state.add('GameState',GameState);
game.state.start('GameState');