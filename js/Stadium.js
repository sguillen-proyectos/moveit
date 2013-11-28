Stadium = function() {};
Stadium.prototype = {
  init: function() {
    var object3D = new THREE.Object3D();
    var mesh = this.getCube();
    mesh.rotation.y = -95*Math.PI/180;
    // mesh.rotation.x = 90*Math.PI/180;
    mesh.position.x = 23.2;
    mesh.position.z = -2;
    object3D.add(mesh);

    mesh = this.getCube();
    mesh.position.z = -25;
    mesh.scale.x = 1.4;
    object3D.add(mesh);

    mesh = this.getCube();
    mesh.rotation.y = 90*Math.PI/180;
    mesh.position.z = -25;
    mesh.position.x = -25;
    mesh.scale.x = 2;
    object3D.add(mesh);

    this.object3D = object3D;
  },
  getCube: function() {
    var texture;
    texture = THREE.ImageUtils.loadTexture('../img/seats.jpg');
    geometry = new THREE.CubeGeometry(40, 30, 0.1);
    material = new THREE.MeshPhongMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);

    return mesh;
  },
  getObject3D: function() {
    return this.object3D;
  }
};
