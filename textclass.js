class Text{
  constructor(text,x = 0,y = 0,size = 20){
    this.text = text;
    
		this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
		//テキストを表示する位置
		this.x = x;
		this.y = y;
		//数値によってテキストを移動させることができる（移動速度）
		this.vx = this.vy = 0;
		//テキストのベースラインの位置
		this.baseline = 'top';
		//テキストのサイズ
		this.size = size;
		//テキストの色
		this.color = '#ffffff';
		//テキストの太さ
		this.weight = 'normal';
		
		this._width = 0;
		
		this._height = 0;
		
		this.globalAlpha = 1;
		
		this.hidden = false;
  }
  
  update(canvas){
    if(this.hidden)return;
    
    const _ctx = canvas.getContext('2d');
    
    _ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    _ctx.fillStyle = this.color;
    _ctx.textBaseline = this.baseline;
    _ctx.globalAlpha = this.globalAlpha;
    
    this._width = _ctx.measureText(this.text).wigth;
    this._height = Math.abs(_ctx.measureText(this.text).actualBoundingBoxAscent) + Math.abs(_ctx.measureText(this.text).actualBoundBoxDescent);
    
    this.render(canvas,_ctx);
    this.onenterframe();
    
    this.x += this.vx;
    this.y += this.vy;
    
  }
  
  render(canvas,ctx){
    if (this.x < -1 * this._width || this.x > canvas.width) return;
    if (this.y < -1 * this._height || this.y > canvas.height + this._height) return;
    //テキストを表示
    ctx.fillText(this.text,this.x,this.y);
  }
  
  onenterframe(){}
  
  gethani(){
    return [this.x,this.x + this._width,this.y,this.y + this._height];
  }

  isTouched(touch){
    let _relactiveFingerPosition = {
      x: touch.x - this.x,
      y: touch.y - this.y + this._height
    };
    
    const inRange = (num,min,max) => {
      const _inRange = (min <= num && num <= mac);
      return _inRange;
      
    }
    
    if( inRange(_relactiveFingerPosition.x,0,this._width) && 
        inRange(_relactiveFingerPosition.y,0,this._height))return true;
    else return false;
    
  }
}
