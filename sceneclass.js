class Scene{
  constructor(){
    this.objs  = [];
    this.flags = [];
    this.nowflag ;
    this.map;
    this.nowpoint  = []; //touchtype,color,xzahyou,yzahyou
    this.lastpoint = []; //touchtype,color,xzahyou,yzahyou
    this.conectlines = []; //タイルを結ぶ線を入れておく。タイルを消す度空にする。
    this.elementstate = new Elementstate;
    this.timer = []; //タイマーのLineをいれておく。widthにアクセスする。
    this.shuffleMessage ;
    this.banmenussura =[];
  }
  
  add(obj,isconectline = false){
    if(isconectline == false)this.objs.push(obj);
    else this.conectlines.push(obj);
  }
  
  update(canvas){
    this.onenterframe();
  }
  
  timerstart(){
    
  }
  
  onenterframe(){} //オーバーライドする
  
  touchevent(){}
}

