SoccerBall = function(options) {
  var defaults = {
    name: 'ball_' + Math.random(),
    size: 2,
    posX: 2.3,
    posY: 3.1,
    posZ: -20
  };
  $.extend(defaults, options);
  this.config = defaults;
};
SoccerBall.prototype = {
  events: {},

  init: function() {
    var texture = THREE.ImageUtils.loadTexture('../img/ball.jpg');
    var geometry = new THREE.SphereGeometry(this.config.size, 32, 32);
    var material = new THREE.MeshPhongMaterial({map: texture });
    var mesh = new Physijs.SphereMesh(geometry, material, undefined, {restitution: Math.random()*1.5});
    mesh.position.x = this.config.posX;
    mesh.position.y = this.config.posY;
    mesh.position.z = this.config.posZ;
    mesh.__dirtyPosition = true;

    this.object3D = mesh;
    this.object3D.gameName = this.config.name;
  },
  update: function() {
    if (this.object3D.position.z < 25) {
      this.object3D.position.z += 0.2;
      this.object3D.rotation.x += 0.1;
      this.object3D.rotation.z += Math.random() * 0.02;
    } else {
      if (this.events['uselessObject']) {
        if(this.events['uselessObject'].justOne) {
          console.log('asd');
          this.events['uselessObject'].callback(this.object3D);
          this.events['uselessObject'].justOne = false;
        }
      }
    }
    this.object3D.__dirtyPosition = true;
    this.object3D.__dirtyRotation = true;
  },
  getObject3D: function() {
    return this.object3D;
  },
  addEventListener: function(eventName, handler) {
    this.events[eventName] = {
      justOne: true,
      callback: handler
    };
  }
};
