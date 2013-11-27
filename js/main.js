(function($) {
  var renderer, scene, camera, render, game;
  $(document).ready(function() {
    var el = document.getElementById('container');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    el.appendChild(renderer.domElement);

    scene = new Physijs.Scene();

    camera = new THREE.PerspectiveCamera(45, el.offsetWidth/el.offsetHeight, 1, 1000);
    camera.position.set(0, 10, 35);
    camera.lookAt(scene.position);
    scene.add(camera);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 20, 35 );
    light.target.position.copy( scene.position );
    scene.add( light );


    initGame();

    requestAnimationFrame(render);
  });

  function initGame() {
    game = new Game({
      renderer: renderer,
      camera: camera,
      scene: scene
    });
    game.init();

  }

  render = function() {
    scene.simulate();
    renderer.render(scene, camera);
    game.update();
    requestAnimationFrame(render);
  };
})(jQuery);
