Player = function() {
  this.CONST = {
    SPEED: 1.2
  };
};
Player.prototype = {
  isAlive: true,

  init: function() {
    var box = new Physijs.BoxMesh(
      new THREE.CubeGeometry(3, 5, 1),
      new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    );
    box.position.y = 3;
    box.position.z = 20;
    this.object3D = box;

    var self = this;
    this.object3D.addEventListener('collision', function(a,b,c) {
      if(a.gameName === 'ground') return;
      self.isAlive = false;
      console.log('Game OVER!!! - ' + a.gameName);
      self.object3D.position.z = 0;
      self.object3D.__dirtyPosition = true;
      setTimeout(function() {
        self.object3D.rotation.x = 0;
        self.object3D.rotation.y = 0;
        self.object3D.rotation.z = 0;
        self.object3D.__dirtyRotation = true;
      }, 200);
    });
  },
  move: function(key) {
    if (key === 37) this.moveLeft();
    else if (key === 39) this.moveRight();
  },
  moveLeft: function() {
    this.object3D.position.x -= this.CONST.SPEED;

    // box.position.y = 3.1;
    this.object3D.__dirtyPosition = true;
  },
  moveRight: function() {
    this.object3D.position.x += this.CONST.SPEED;

    // box.position.y = 3.1;
    this.object3D.__dirtyPosition = true;
  },
  update: function() {
    // if (this.isAlive) {
    //   this.object3D.position.x += 0.01;
    // }
  },
  getObject3D: function() {
    return this.object3D;
  }
};
