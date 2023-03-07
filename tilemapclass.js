class Tilemap {
  constructor(size,data,falldata) {

    this.x = this.y = 32;
    this.size       = size || 32;
    this.mapwidth  = 7;
    this.mapheight = 12;
    this.hiddenheight=6;
    this.data       = data||[];
    this.newdata    = data||[];
    this.falldata   = falldata||[];  //落ちるタイル数
    this.datatiles  = [];  //dataとfalldataを反映したtileたちをいれておく
    this.selectedzahyous = []; //消える予定の[x,y]を入れておく。
    this.tiles      = [];  //add(tile)で外部から追加できる
    this.animations = []; 
    
    this.datatilesSansyutu();
    
    $('testbutton1').onclick = () => {
      if($('testinput1').value == '' ||
         $('testinput2').value == '' ||
         $('testinput3').value == '')return;
      let x = Number( $('testinput1').value );
      let y = Number( $('testinput2').value );
      let z = Number( $('testinput3').value );
      this.datatiles[y][x].fall(z);
      this.add(new Animationtile('disappearAnimation.png',x,y,5));
    }

  }
  
  add(obj){
    if(obj instanceof Tile)this.tiles.push(obj);
    if(obj instanceof Animationtile)this.animations.push(obj);
    
  }
  
  deleattile(){
    //this.selectedzahyousを元に、falldataとnewdataを算出する。
    for(let i=0;i<this.selectedzahyous.length ;i++){
      let selx = this.selectedzahyous[i][0] ;
      let sely = this.selectedzahyous[i][1] ;
      this.newdata[ sely -1 ][ selx -1 ]= 0;
      this.data[ sely -1 ][ selx -1 ]= 0;
      this.add(new Animationtile('disappearAnimation.png',selx-1,sely-1,4));
      for(let y2 = sely-1; y2>0;y2--){
        this.falldata[ y2 -1 ][ selx -1 ] ++;
      }
     
    }
    this.selectedzahyous =[];

    
    for(let cou=0;cou<6;cou++){
      for(let ycou=this.newdata.length -1;ycou>0;ycou--){
        for(let xcou=0;xcou<this.newdata[ycou].length;xcou++){
          if(this.newdata[ycou][xcou] == 0){
            this.newdata[ycou][xcou] = this.newdata[ycou - 1][xcou];
            this.newdata[ycou - 1][xcou] = 0;
          }
        }
      }
      
    }
    
    for (let ycou = this.newdata.length - 6; ycou >= 0; ycou--) {
      for (let xcou = 0; xcou < this.newdata[ycou].length; xcou++) {
        if (this.newdata[ycou][xcou] == 0) {
          let ran = random(1,6);
          this.newdata[ycou][xcou] = ran;
         // this.add(new Tile( color[ran],xcou*this.size+this.x,ycou*this.size+this.y));
          
        }
      }
    }
    this.data= this.newdata;
    
    setTimeout(()=>{
      
      this.datatilesSansyutu();
    },10);
    
  }
  
  

  update(canvas) {
    //this.render(canvas);
    for (let y = 0; y < this.datatiles.length; y++) {
      for(let x=0;x<this.datatiles[y].length;x++){
        if(this.data[y][x] == 0)continue;
        if(this.falldata[y][x] >0){
          this.datatiles[y][x].fall(this.falldata[y][x]);
          this.falldata[y][x] = 0;
        }
        this.datatiles[y][x].update(canvas);
      }
    }
    
    this.onenterframe();
    
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].update(canvas);
    }
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].update(canvas);
    }
    
  }

  datatilesSansyutu(isReturnonly = false) {
    
    let re = [];
    let retu       = [];
    for (let y = 0; y < this.data.length; y++) {
      const _tileY = this.size * y + this.y;

      for (let x = 0; x < this.data[y].length; x++) {
        const _tileX = this.size * x + this.x;
        /*
        let thisfalldata = this.falldata[y][x] * 32;
        this.falldata[y][x] = 0;
       
        let fallpx = 0;
        if(thisfalldata>=16){   //落下pxが指定されているなら実行
          fallpx = 16; 
          this.falldata[y][x] -= 16;
        }else if(thisfalldata>0){
          fallpx = thisfalldata;
          this.falldata[y][x] = 0;
        }
        */
        
        let thiscolornum = this.data[y][x];
        const tile = new Tile(color[thiscolornum] + '.png',
                              _tileX, _tileY, thiscolornum);
        //tile.howpxfall = thisfalldata;
        retu.push(tile);
      

       /*
       const _ctx = canvas.getContext('2d');
        const thisimg = new Image();
        thisimg.src = color[this.data[y][x]] + '.png';

        _ctx.drawImage(thisimg, 0, 0, 
                       this.size, this.size,
                       _tileX, _tileY + fallpx, 
                       this.size, this.size);  
      */
      }
      re.push(retu);
      retu = [];
    }
    if(isReturnonly){
      return re;
    }else{
      this.datatiles = re;
    }
    
  }
  
  isTumi() {
    
    for(let y=this.hiddenheight;y<this.mapheight;y++){
      for(let x=0;x<this.mapwidth;x++){
        //横
        if(x != 0 && this.data[y][x] == this.data[y][x - 1])return false;
        //縦
        if(y != this.hiddenheight && this.data[y][x] == this.data[y-1][x])return false;
        //右斜め上
        if(x != this.mapwidth - 1 && y != this.hiddenheight && this.data[y][x] == this.data[y-1][x+1])return false;
        //左斜め上
        if(x != 0 && y != this.hiddenheight && this.data[y][x] == this.data[y-1][x-1])return false;
      }
    }
    return true;
    
  }
  
  shuffle(){
      let map = [];
      let fallmap = [];
      let retu = [];
      let fallretu = [];
      for (let y = 0; y < this.mapheight; y++) {
        for (let x = 0; x < this.mapwidth; x++) {
          retu.push(random(1, 6));
          fallretu.push(0);
        }
        map.push(retu);
        fallmap.push(fallretu);
        retu = [];
        fallretu = [];
      }
      
      this.data = map;
      this.newdata = map;
      this.falldata = fallmap;
      this.datatilesSansyutu();
    
  }

  onenterframe() {} //オーバーライドする
}
