Game = function(options) {
  this.renderer = options.renderer;
  this.scene = options.scene;
  this.camera = options.camera;
  this.objects = [];

  var ground = new Ground();
  this.addMesh(ground);

  var stadium = new Stadium();
  stadium.init();
  this.addMesh(stadium);

  this.registerEvents();
};
Game.prototype = {
  renderer: undefined,
  scene: undefined,
  camera: undefined,
  box:  undefined,

  init: function() {
    var self = this;
    var level = this.getLevel();
    var i = 0;

    var ballHandler = function(object) {
      self.scene.remove(object);
    };
    var scheduler = function() {
      var sb = new SoccerBall({
        name: 'ball_'+i,
        posX: level.positions[i].x
      });
      sb.init();
      sb.addEventListener('uselessObject', ballHandler);
      self.addMesh(sb);
      i++;
      clearTimeout(scheduler);
      setTimeout(scheduler, level.times[i]*1000);
    };
    setTimeout(scheduler, level.times[i]*1000);

    this.player = new Player();
    this.player.init(function(mesh) {
      self.scene.add(mesh);
    });

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
  },
  getLevel: function() {
    var result = {
      length: 10,
      times: [0.0, 1.3, 1.0, 1.0, 0.2, 1.0, 1.0, 1.0, 1.0, 0.5],
      positions: [
        {x: 0 },
        {x: -4 },
        {x: +5 },
        {x: -6 },
        {x: +7 },
        {x: -4 },
        {x: 1 },
        {x: -5 },
        {x: +3 },
        {x: -7 }
      ]
    };
    return result;
  }
};
