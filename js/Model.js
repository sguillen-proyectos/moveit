Model = function() {};
Model.prototype = {
  init: function(scene) {
    var loader = new THREE.JSONLoader();
    loader.load('../models/gastonLagaffe.js', function(geometry) {
      var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.rotation.y = Math.PI/2;
      mesh.position.set(0, 0, 20);
      scene.add(mesh);
    });
  }
};
