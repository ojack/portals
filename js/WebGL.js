


var WebGL = class WebGL {
  constructor(local_stream, remote_stream){
   var renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.bodyinsertBefore(renderer.domElement, document.body.firstChild);
  }
 
}


export default WebGL;