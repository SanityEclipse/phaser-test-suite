Game.Level = function(game) {};

var background;
var controls = {}; // basic controls implemented; mapped to 'D', 'A', 'W', and 'SPACEBAR'
var facing;
var jumpTimer = 0;
var layer;
var map;
var player;
var playerSpeed = 300; //adjusts player sprite movement in-game.
var text; //needed to add in-game text

Game.Level.prototype = {

  create: function(game) {

    this.camera.flash('#000000');

    backgroundMusic = game.add.audio('bgmusic');
    backgroundMusic.loop = true;
    backgroundMusic.play();

    this.jump = game.add.audio('jump');

    background = this.add.image(0, 0, "Level_Bg");
    background.width = game.width;
    background.height = game.height;
    background.fixedToCamera = true;
    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map', 32, 32, 0, 0, 0); //('tileset', tileWidth, tileHeight, tileMargin, tileSpacing, gid)
      map.addTilesetImage('tileset');
      map.setCollisionBetween(18, 19);
      map.setCollision(33);
      map.setCollisionBetween(296, 299);
      map.setTileIndexCallback(361, this.resetPlayer, this);
      map.setTileIndexCallback(368, this.resetPlayer, this);

    layer = map.createLayer(0);
      layer.resizeWorld();

    // Player Character Methods

    player = this.add.sprite(100, 400, 'player'); // (x starting point, y starting point, 'name string')
      player.anchor.setTo(0.5, 0.5); // sets anchor to the center of the sprite

      // ('name of animation sequence', [frames to be played], FPS, numeric index boolean)
      player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6], 10, true);
      player.animations.add('jump', [7], 1, true);
      player.animations.add('run', [7, 8, 9, 10], 10, true);
      this.camera.follow(player); // camera will remained focused on player
      this.physics.arcade.enable(player); //enables arcade physics on the player
      player.body.collideWorldBounds = true; // prevents player from falling out of the canvas

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) //unassigned
    }

  },

  update: function() {

    this.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (controls.right.isDown) {
      player.animations.play('run');
      player.scale.setTo(1, 1);
      player.body.velocity.x += playerSpeed;
      facing = 'right';

    }

    if (controls.left.isDown) {
      player.animations.play('run');
      player.scale.setTo(-1, 1);
      player.body.velocity.x -= playerSpeed;
      facing = 'left';

    }

    if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
      player.body.velocity.y = -600;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
      this.jump.play();

    }

    if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
      player.animations.play('idle');

    }

  },

resetPlayer: function() {
  player.reset(100, 400)
  // this.state.start('Level', true, false);
  }

}

// Collision Detection Function
//
// checkOverlap: function(spriteA, spriteB) {
//   if (spriteA.alive == false || spriteB.alive == false){
//     return false
//   }
//     var boundsA = spriteA.getBounds();
//     var boundsB = spriteB.getBounds();
//     return Phaser.Rectangle.intersects(boundsA, boundsB);
// }
