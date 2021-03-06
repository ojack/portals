var AudioProcessing = require('./AudioProcessing.js');

var WIDTH;
var HEIGHT;
var STEP = 1;
var VID_STEP = 1;
var video;
var context;
var blend_index = 0;
var BLEND = ['overlay', 'difference', 'multiply', 'screen', 'darken', 'lighten', 'exclusion', 'color-burn', 'hard-light', 'soft-light', 'color', 'saturation'];

var CanvasBlend = class CanvasBlend {
  constructor(local_stream, remote_stream){
     var context = new AudioContext();
    this.video = document.getElementById("local-stream");
    this.video.src = URL.createObjectURL(local_stream);
    this.remote = document.getElementById("remote-stream");
    this.remote.src = URL.createObjectURL(remote_stream);
    var canvas = document.createElement('canvas');
   
    WIDTH  = window.innerWidth;
    HEIGHT  = window.innerHeight;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    this.canvas = canvas;

    this.outIndex = 0;
    this.vidIndex = 0;
    this.remoteVolume = 0;
    this.mode = 0;
    document.body.insertBefore(canvas, document.body.firstChild);
    console.log("created slit scan");
    console.log(this);
    this.localAudio = new AudioProcessing(local_stream, context);

    //this.remoteAudio = new AudioProcessing(remote_stream, context);
  }
  toggleProportional(){
    //this.proportional = val;
    this.proportional = this.proportional == true  ? false : true;
    console.log(this.proportional);
  }
  changeMode(){
    this.mode++;
    if(this.mode > 2) this.mode=0;
    console.log(this.mode);
  }
  addData(data){
    //console.log("remote vol is "+ data);
   // this.localVolume = this.localAudio.getVolume();
    this.remoteVolume = data;
  }
  getVolume(){
    this.localVolume = this.localAudio.getVolume();
    return this.localVolume;
  }
  increaseStep(){
    STEP++;
    console.log(STEP);
  }
  restart(){
    this.outIndex = 0;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }
  changeBlend(){
    console.log("changing blend");

    blend_index++;
    if(blend_index >= BLEND.length){
      blend_index = 0;
    }
    document.getElementById("info").innerHTML = BLEND[blend_index];
  }
  decreaseStep(){
    STEP--;
     console.log(STEP);
  }
  resize(){
    console.log("resizing");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  addFrame(){


     this.context = this.canvas.getContext('2d');
     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = BLEND[blend_index];
   this.context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, 0, 0, this.canvas.width, this.canvas.height);
   this.context.drawImage(this.remote, 0, 0, this.remote.videoWidth, this.remote.videoHeight, 0, 0, this.canvas.width, this.canvas.height);


   //  this.vidIndex = this.video.videoWidth/2;
   //  var vidHeight = this.video.videoHeight;
   // // console.log(vidHeight);
   // if(this.mode==1){
   //  var tot = this.localVolume+ this.remoteVolume;
   //  var localHeight = HEIGHT*3*this.localVolume/tot;
   //   this.context.drawImage(this.video, this.vidIndex, 0, STEP, vidHeight, this.outIndex, 0, STEP, localHeight);
   //    this.context.drawImage(this.remote, this.remote.videoWidth/2, 0, STEP, this.remote.videoHeight, this.outIndex, localHeight, STEP, HEIGHT*3-localHeight);
   // } else if(this.mode == 0){
   //   this.context.drawImage(this.video, this.vidIndex, 0, STEP, vidHeight, this.outIndex, HEIGHT*(1.5-this.localVolume/50), STEP, HEIGHT*this.localVolume/50);
   //    this.context.drawImage(this.remote, this.remote.videoWidth/2, 0, STEP, this.remote.videoHeight, this.outIndex, HEIGHT*1.5, STEP, HEIGHT*this.remoteVolume/50);
   // } else {
   //    this.context.drawImage(this.video, this.vidIndex, 0, STEP, vidHeight, this.outIndex, 0, STEP, HEIGHT);
   //    this.context.drawImage(this.remote, this.remote.videoWidth/2, 0, STEP, this.remote.videoHeight, this.outIndex, HEIGHT*2, STEP, HEIGHT);
   //     if(this.outIndex%2==0){
   //     this.context.drawImage(this.canvas, this.outIndex, 0, STEP, HEIGHT, this.outIndex, HEIGHT, STEP, HEIGHT);
   //   } else {
   //     this.context.drawImage(this.canvas, this.outIndex, HEIGHT*2, STEP, HEIGHT, this.outIndex, HEIGHT, STEP, HEIGHT);
   //   }
   // }
   //  this.outIndex += STEP;
   //     // vidIndex += VID_STEP;
   //      if(this.outIndex > WIDTH) this.outIndex = 0;
    
  }
}


export default CanvasBlend;