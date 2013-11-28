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
    // initCamera();
  });

  function initGame() {
    requestAnimationFrame(render);

    game = new Game({
      renderer: renderer,
      camera: camera,
      scene: scene
    });
    game.init();

    window.General = {
      gameStarted: true
    };
  }

  function initCamera() {
    var videoInput = document.getElementById('vid');
    var canvasInput = document.getElementById('compare');
    var debugOverlay = document.getElementById('debug');

    var htracker = new headtrackr.Tracker({
      calcAngles : true,
      ui : false,
      headPosition : false,
      debug : debugOverlay
    });

    htracker.init(videoInput, canvasInput);
    htracker.start();
    var first = true;

    document.addEventListener('headtrackrStatus', function(e) {
      if(e.status == 'found') {
        if (first) {
          first = false;
          initGame();
        }
      }
    });
    document.addEventListener('facetrackingEvent', function(e) {
      // this.game.player.getObject3D().position =v
      var x = e.x;
      if (165 <= x && x <= 220) {
        game.player.getObject3D().position.x -= 0.1;
        game.player.getObject3D().__dirtyPosition = true;
      } else if (55 <= x && x <= 130) {
        game.player.getObject3D().position.x += 0.1;
        game.player.getObject3D().__dirtyPosition = true;
      }
    });
  }

  render = function() {
    if (!window.General.gameStarted) return;

    scene.simulate();
    renderer.render(scene, camera);
    game.update();
    requestAnimationFrame(render);
  };
})(jQuery);
