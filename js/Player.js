Player = function() {
  this.CONST = {
    SPEED: 0.27
  };
};
Player.prototype = {
  init: function(modelLoadedCallback) {
    this.loadModel(modelLoadedCallback);
    var box = new Physijs.BoxMesh(
      new THREE.CubeGeometry(1.4, 5, 1),
      new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 0 })
    );
    box.position.y = 3;
    box.position.z = 20;
    this.object3D = box;

    var self = this;
    this.object3D.addEventListener('collision', function(a,b,c) {
      if(a.gameName === 'ground') return;

      console.log('Game OVER!!! - ' + a.gameName);
      window.General.gameStarted = false;
    });
  },
  loadModel: function(callback) {
    var self = this;
    var loader = new THREE.JSONLoader();
    loader.load('../models/gastonLagaffe.js', function(geometry) {
      var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.rotation.y = Math.PI/2;
      mesh.position.set(0, 0, 20);

      self.model3D = mesh;

      callback(mesh);
    });
  },
  move: function(key) {
    if (key === 37) this.moveLeft();
    else if (key === 39) this.moveRight();
    else if (key === 32) this.rotateModel();
  },
  moveLeft: function() {
    this.model3D.rotation.y -= 0.01;
    this.model3D.position.x -= this.CONST.SPEED;
    this.object3D.position.x -= this.CONST.SPEED;
    this.object3D.__dirtyPosition = true;
  },
  moveRight: function() {
    this.model3D.rotation.y += 0.01;
    this.model3D.position.x += this.CONST.SPEED;
    this.object3D.position.x += this.CONST.SPEED;
    this.object3D.__dirtyPosition = true;
  },
  rotateModel: function() {
    this.model3D.rotation.y += this.CONST.SPEED;
  },
  getObject3D: function() {
    return this.object3D;
  }
};
