class Game{
  constructor(width,height){
    this.canvas = $('canvas');
    this.canvas.width = width || 320;
    this.canvas.height = height || 320;
    
    this.scenes = [];
    this.currentScene;
    
    this.touch = new Touch();
    
    this.player = new Player();
  }
  
  start(){
    this.currentScene = this.currentScene || this.scenes[0];
    
    this.canvas.addEventListener('touchstart',(event) => {
      event.preventDefault();
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = $('canvas').getBoundingClientRect();

  		x = event.touches[0].pageX;
		  y = event.touches[0].pageY;
	
      x = x - offset.left - window.pageXOffset;
    	y = y - offset.top - window.pageYOffset;
  	
    	this.touch.touchtype = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
      
      //var sp = new Pointer('red.png',x-16,y-16);
      //this.currentScene.add(sp);
    });
    this.canvas.addEventListener('touchmove',(event)=>{
      event.preventDefault();
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = $('canvas').getBoundingClientRect();

		  x = event.changedTouches[0].pageX;
  		y = event.changedTouches[0].pageY;
  	
      x = x - offset.left - window.pageXOffset;
  	  y = y - offset.top - window.pageYOffset;
  	
    	this.touch.touchtype = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
      
      //var sp = new Pointer('blue.png', x - 16, y - 16);
      //this.currentScene.add(sp);
    });
    this.canvas.addEventListener('touchend',(event)=>{
      event.preventDefault();
      var eventType = event.type;
    
      var x = 0, y = 0;
      const offset = $('canvas').getBoundingClientRect();

		  x = event.changedTouches[0].pageX;
  		y = event.changedTouches[0].pageY;
  	
      x = x - offset.left - window.pageXOffset;
  	  y = y - offset.top - window.pageYOffset;
  	
    	this.touch.touchtype = eventType;
    	this.touch.x = x;
    	this.touch.y = y;
    });
    
    this.canvas.addEventListener('touchcancel',(event)=>{
      this.touch.touchtype = event.type;
      
    });

    
    this._mainLoop();
  }
  
  _mainLoop(){
    const ctx = this.canvas.getContext('2d');
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    
    this.currentScene.update();
    
    for(let i=0;i<this.currentScene.objs.length;i++){
      this.currentScene.objs[i].update(this.canvas);
    }
    for (let i = 0; i < this.currentScene.conectlines.length; i++) {
      this.currentScene.conectlines[i].update(this.canvas);
    }
    for (let i = 0; i < this.currentScene.timer.length; i++) {
      this.currentScene.timer[i].update(this.canvas);
    }
    for (let i = 0; i < this.currentScene.elementstate.objs.length; i++) {
      this.currentScene.elementstate.objs[i].update(this.canvas);
    }
    for (let i = 0; i < this.currentScene.banmenussura.length; i++) {
      this.currentScene.banmenussura[i].update(this.canvas);
    }
    
    
    requestAnimationFrame(this._mainLoop.bind(this));
    
  }
  
  add(scene){
    if(scene instanceof Scene)this.scenes.push(scene);
    else console.error('Gameに追加できるのはSceneだけです');
    
  }
  
  
}
