Game.Preloader = function(game) {

    this.preloadBar = null
};

Game.Preloader.prototype = {
    preload: function() {
      this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.time.advancedTiming = true;
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('Level_Bg', 'assets/images/background.png');

      this.load.tilemap('map', 'assets/maps/main_set.csv');
      this.load.image('tileset', 'assets/maps/main_set.png');

      this.load.spritesheet('player', 'assets/images/player-sprite.png', 40, 64);

      this.load.audio("bgmusic","assets/sounds/bgmusic.mp3");

      this.load.audio("jump","assets/sound-effects/jump.wav");

    },

    create: function() {
          this.state.start('Test Level', true, false);
        },

    };
