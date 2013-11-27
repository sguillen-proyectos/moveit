Game = function(options) {
  this.renderer = options.renderer;
  this.scene = options.scene;
  this.camera = options.camera;
  this.objects = [];

  var ground = new Ground();
  this.addMesh(ground);

  this.registerEvents();
};
Game.prototype = {
  renderer: undefined,
  scene: undefined,
  camera: undefined,
  box:  undefined,

  init: function() {
    sb1 = new SoccerBall({
      posX: -1, name: 'ball_1'
    });
    sb1.init();
    sb1.addEventListener('uselessObject', function(object) {
      alert('xD');
    });
    var self = this;
    setTimeout(function() {
      sb2 = new SoccerBall({
        posX: 9, name: 'ball_2'
      });
      sb2.init();
      sb2.addEventListener('uselessObject', function() {
        alert('OO');
      });
      self.addMesh(sb2);
    }, 1000);

    this.player = new Player();
    this.player.init();

    this.addMesh(sb1);
    // this.addMesh(sb2);
    this.addMesh(this.player);
  },
  update: function() {
    for(var i = 0; i < this.objects.length; ++i) {
      if (this.objects[i].update) {
        this.objects[i].update();
      }
    }
  },
  addMesh: function(object) {
    this.scene.add(object.getObject3D());
    this.objects.push(object);
  },
  registerEvents: function() {
    var self = this;
    document.addEventListener('keydown', function(e) {
      self.player.move(e.keyCode);
    }, false);
  }
};
