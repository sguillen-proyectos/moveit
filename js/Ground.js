Ground = function() {
  this.init();
};
Ground.prototype = {
  init: function() {
    var gm = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../img/field.jpg' ) }),
      0.8, // high friction
      0.4 // low restitution
    );
    gm.map.wrapS = gm.map.wrapT = THREE.RepeatWrapping;
    // gm.map.repeat.set(2.5, 2.5);

    var ground = new Physijs.BoxMesh(
      new THREE.CubeGeometry(50, 1, 50),
      gm,
      0
    );
    ground.receiveShadow = true;
    ground.position.set(0, 0, 0);
    ground.gameName = 'ground';

    this.object3D = ground;
  },
  getObject3D: function() {
    return this.object3D;
  }
};
