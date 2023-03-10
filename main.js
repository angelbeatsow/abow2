const canvas_width  = 640;
const canvas_height = 450;

const mapwidth   = 7;
const mapheight  = 6;
const tile_size  = 32;  //px

let isTyutoriaru = false;


window.onload= function(){
  
  const game = new Game(canvas_width,canvas_height);
  
  
  const titlescene = ()=>{
    $('nameinput').style.display = '';
    
    const scene = new Scene();

    scene.elementstate.objs = [];
    
    scene.add( new Text('ABOW(仮)2',32,32,32));
    scene.add( new Text('はじめから',32*8 + 12,32*3 +30,20));
    scene.add( new Text('つづきから',32*8 + 12,32*6 +30,20));
    
    scene.add( new Rect(32*8,32*3 +22,32*4,32));
    scene.add( new Rect(32*8,32*6 +22,32*4,32));
    
    scene.onenterframe=()=>{
      if(game.touch.touchtype =='touchstart' &&
         game.touch.x > 32*8 &&
         game.touch.x < 32*12 &&
         game.touch.y > 32*3 + 22 &&
         game.touch.y < 32*4 + 22 &&
         $('nameinput').value != ''
         ){  //はじめから
           let name = $('nameinput').value;
           game.player.name = name;
           $('nameinput').style.display = 'none';
           
           isTyutoriaru = true;
           
           game.currentScene = menuscene();
         }
         
         if (game.touch.touchtype == 'touchstart' &&
           game.touch.x > 32 * 8 &&
           game.touch.x < 32 * 12 &&
           game.touch.y > 32 * 6 + 22 &&
           game.touch.y < 32 * 7 + 22
         ) { //つづきから
             $('nameinput').style.display = 'none';
             
             game.currentScene = menuscene();
         }
      
      
    }
    
    
    return scene;
  }//titlesceneここまで
  
  
  const menuscene = ()=>{
    const textsize = 18;
    
    const scene = new Scene();
    scene.elementstate.objs = [];
  
    scene.nowflag = 0;
    
    function addBasicObjs(){

      const rect1 = new Rect(32 * 14,32,32 * 5,32 * 6);
      scene.add(rect1);
      const rect2 = new Rect(32 * 14, 32 * 8 - 4, 32 * 5, 32 * 5 + 4);
      scene.add(rect2);
      const rect3 = new Rect(32, 32 , 32 * 12, 32 * 12);
      scene.add(rect3);
      
      var txt = new Text(game.player.name,32 * 14 + 5,32 * 8 + 5,textsize);
      scene.add(txt);
      var txt = new Text('Lv : ' + game.player.lv, 32 * 14 + 5, 32 * 8 + (textsize + 4),textsize);
      scene.add(txt);
      var txt = new Text(game.player.job + '(Lv : ' + game.player.joblv + '/10)', 32 * 14 + 5, 32 * 8 + (textsize + 4) * 2, textsize);
      scene.add(txt);
      var txt = new Text('HP : ' + game.player.hp, 32 * 14 + 5, 32 * 8 + (textsize + 4) * 3, textsize);
      scene.add(txt);
      var txt = new Text('攻 : ' + game.player.pow, 32 * 14 + 5, 32 * 8 + (textsize + 4) * 4, textsize);
      scene.add(txt);
      var txt = new Text('魔 : ' + game.player.mpow, 32 * 14 + 5, 32 * 8 + (textsize + 4) * 5, textsize);
      scene.add(txt);
      var txt = new Text('EXP : ' + game.player.exp + '/100', 32 * 14 + 5, 32 * 8 + (textsize + 4) * 6, textsize);
      scene.add(txt);
      
      //文字selectText[i]を生成。
      //scene.nowflagがiでない時に文字を押されると、
      //scene.objsを変更するselectFunctions[i]が呼ばれ、
      //scene.nowflagをiにする。
      const selectTexts = ['冒険','エレメント','転職','セーブ'];
      const selectFunctions = [addBasicObjs,addElementObjs,addTensyokuobjs,addSaveObjs];
      scene.falgs = selectTexts;
      
      for(let i=0;i<selectTexts.length;i++){
      
          const _txt = new Text(selectTexts[i], 32 *14 + 5, 32 + 6 + (textsize + 12) * i, textsize);
          _txt.onenterframe= ()=>{
          if(scene.nowflag == i)return;
          if(_txt.isTouched(game.touch)[0] == 'touchstart' && _txt.isTouched(game.touch)[1] == true){
          //このtextが押されたら
            console.log(_txt.text);
            scene.nowflag = i;
            scene.objs = [];
            addBasicObjs();
            selectFunctions[i]();
          }
        }
        scene.add(_txt);
      }
      
      

    }//addBasicObjsここまで
    
    function addBoukenObjs(){}
    
    function addElementObjs(){}
    
    function addTensyokuobjs(){}
    
    function addSaveObjs(){}
    
    addBasicObjs();
    addBasicObjs();
    
    return scene;
  }  //menusceneここまで


const puzzlescene = ()=>{
  
  let map      = [];
  let fallmap  = [];
  let retu     = [];
  let fallretu = [];
  for(let y=0;y<mapheight*2;y++){
    for(let x=0;x<mapwidth;x++){
      retu.push(random(1,6));
      fallretu.push(0);
    }
    map.push(retu);
    fallmap.push(fallretu);
    retu = [];
    fallretu = [];
  }
  
  const scene = new Scene();
  
  const tilemap = new Tilemap(32,map,fallmap);
  
  scene.map        = map;
  scene.nowflag    = 1;

  scene.add(tilemap);
  
  scene.add( new Text('Lv:',32*12,40*1 + 6) );
  scene.add( new Text('Lv:',32*12,40*2 + 6) );
  scene.add( new Text('Lv:',32*12,40*3 + 6) );
  scene.add( new Text('Lv:',32*12,40*4 + 6) );
  scene.add( new Text('Lv:',32*12,40*5 + 6) );
  scene.add( new Text('Lv:',32*12,40*6 + 6) );
  scene.add(new Text('/Power:', 32 * 14, 40 * 1 + 6));
  scene.add(new Text('/Power:', 32 * 14, 40 * 2 + 6));
  scene.add(new Text('/Power:', 32 * 14, 40 * 3 + 6));
  scene.add(new Text('/Power:', 32 * 14, 40 * 4 + 6));
  scene.add(new Text('/Power:', 32 * 14, 40 * 5 + 6));
  scene.add(new Text('/Power:', 32 * 14, 40 * 6 + 6));
  scene.add( new Line(32*5 - 16,32,32*5 -16,32*7,'white',32*7) );  //←隠れてる盤面を見たいならコメントアウト
  var banmenussura = new Line(32*5-16,32*7,32*5-16,32*13,'black',32*7);
  banmenussura.globalAlpha = 0.8;
  banmenussura.hidden = true;
  scene.banmenussura.push( banmenussura );
  scene.add( new Line(32,32*7 -5,32*8,32*7 -5,'gray',10) );
  scene.add( new Line(32,32*7 -16,32*8,32*7 -16,'gray',10) );
  scene.timer.push( new Line(32,32*7 -5,32*8,32*7 -5,'red',5) )
  scene.add( new Tile(color[1] + '.png',32*11,40*1)  );
  scene.add( new Tile(color[2] + '.png',32*11,40*2)  );
  scene.add( new Tile(color[3] + '.png',32*11,40*3)  );
  scene.add( new Tile(color[4] + '.png',32*11,40*4)  );
  scene.add( new Tile(color[5] + '.png',32*11,40*5)  );
  scene.add( new Tile(color[6] + '.png',32*11,40*6)  );
  scene.add( new Rect(32*10,40*7,32*8,32*4,3) );
  scene.add( new Takakkei([[32*9,40*7+32*4/2],[32*10-5,40*7],[32*10-5,40*7+32*4]]));
  scene.add( new Takakkei([[32*10 + 32*8 + 32,40*7+32*4/2],[32*10 + 32*8 + 5,40*7],[32*10 + 32*8 + 5,40*7 + 32*4]]));
  let shufflemoji = new Text('消せるブロックがありません。シャッフルします。');
  shufflemoji.globalAlpha = 0;
  scene.shuffleMessage= shufflemoji ;
  
  scene.flags = ['待機','パズル開始','パズル中','パズル終了','行動選択','行動'];
  
  
  scene.onenterframe = function(){
    this.shuffleMessage.update(canvas);

    if (this.nowflag == 1 || this.nowflag == 2) this.banmenussura[0].hidden = true;
    else this.banmenussura[0].hidden = false;
    
  }
  
  scene.touchevent = function(){
    
      

      
    
      if(game.touch.touchtype == 'touchend' || game.touch.touchtype =='touchcancel'){
        
        
        
        let lastcolor = this.lastpoint[1];
        this.lastpoint = [];
        if(this.objs[0].selectedzahyous.length != 0 && this.nowflag == 1) {  
          //this.elementstateのlvを初期化
          this.elementstate.syokika();
          //タイマー開始
          this.nowflag = 2;
          let timerinterval = setInterval(() => {
            if (this.timer[0].startx < this.timer[0].endx) {
              this.timer[0].endx -= 32/4;
            } else {
              this.nowflag = 3;
              clearInterval(timerinterval);
              this.timer[0].endx = 32*8;

              setTimeout(()=>{
                this.objs[0].animations =[];
                this.nowflag = 1;
              },1000);
        
            }
          }, 1000/2);
        }
        if(this.objs[0].selectedzahyous.length != 0){
          //this.elementstateに加算
          let kosuu = this.objs[0].selectedzahyous.length;
          this.elementstate[lastcolor][1] += kosuu;
          if(this.elementstate[lastcolor][0] < kosuu)this.elementstate[lastcolor][0] = kosuu;
          this.elementstate.update(canvas);
          
          //タイルが消える
          this.objs[0].deleattile();
          this.conectlines = [];
          //シャッフル
          console.log('詰み盤面か?:' + this.objs[0].isTumi());
          if(this.objs[0].isTumi()){
            this.shuffleMessage.globalAlpha = 1;
            this.shuffleMessage.hidden = false;
            var a = setInterval(()=>{
              
              this.shuffleMessage.globalAlpha -= 0.2;
              if(this.shuffleMessage.globalAlpha < 0){
                this.shuffleMessage.globalAlpha = 0;
                this.shuffleMessage.hidden = true;
                clearInterval(a);
              }
              
              
            },1000/2);
            
            
            while(this.objs[0].isTumi()){
              this.objs[0].shuffle();
              
            }
          }
        }
        
      }
      

      if (game.touch.x > tile_size && game.touch.x < tile_size * (mapwidth + 1) &&
        game.touch.y > tile_size*(this.objs[0].hiddenheight +1) && game.touch.y < tile_size * (mapheight * 2 + 1) && 
        (this.nowflag == 1 || this.nowflag ==2)) { //パズル中でパズル領域内なら実行
        
        for (let yzahyou = mapheight-1; yzahyou < mapheight * 2; yzahyou++) {
          for (let xzahyou = 0; xzahyou < mapwidth; xzahyou++) {
            
              if (game.touch.x > (tile_size / 8) + tile_size * xzahyou + tile_size &&
                game.touch.x < (tile_size * 7/8) + tile_size * xzahyou + tile_size &&
                game.touch.y > (tile_size / 8) + tile_size * yzahyou + tile_size &&
                game.touch.y < (tile_size * 7/8) + tile_size * yzahyou + tile_size) {
                //tile_sizeの辺を3/4にした正方形の範囲をタッチすると、
                //座標を取得する。(一番左上を(1,1)とする。)
                //touchstart用。
          　　    let thisxzahyou = Math.floor(game.touch.x / tile_size);
                let thisyzahyou = Math.floor(game.touch.y / tile_size);

                let jouhou = [game.touch.touchtype,color[ this.objs[0].data[thisyzahyou - 1][thisxzahyou - 1] ],thisxzahyou,thisyzahyou];
                if(jouhou[0] == 'touchstart'){
                  this.lastpoint = jouhou;
                  this.nowpoint = jouhou;
                 }
              }
            
            if (game.touch.x > (tile_size / 8) + tile_size * xzahyou + tile_size &&
              game.touch.x < (tile_size * 7 / 8) + tile_size * xzahyou + tile_size &&
              game.touch.y > (tile_size / 8) + tile_size * yzahyou + tile_size &&
              game.touch.y < (tile_size * 7 / 8) + tile_size * yzahyou + tile_size) {
              //tile_sizeの辺を3/4にした正方形の範囲をタッチすると、
              //座標を取得する。(一番左上を(1,1)とする。)
              //touchmove用。
              let thisxzahyou = Math.floor(game.touch.x / tile_size);
              let thisyzahyou = Math.floor(game.touch.y / tile_size);
              // console.log([thisxzahyou,thisyzahyou]);
              let jouhou = [game.touch.touchtype,color[ this.objs[0].data[thisyzahyou - 1][thisxzahyou - 1] ],thisxzahyou,thisyzahyou];
              if(JSON.stringify(this.nowpoint) != JSON.stringify(jouhou)){  //パズルタイルを触っていて、game.touchが変わったら、
                     //scene.nowpointに代入
                this.nowpoint = jouhou;
                //console.log(jouhou);
                
                
                
                if(jouhou[0] == 'touchmove' && this.nowpoint[1] == this.lastpoint[1]){
                  let nx = this.nowpoint[2];
                  let ny = this.nowpoint[3];
                  let lx = this.lastpoint[2];
                  let ly = this.lastpoint[3];
                  if(
                     ( (nx == lx - 1 || nx == lx + 1)&&(ny == ly - 1 || ny == ly + 1) )||
                     ( nx==lx && ( (ny == ly + 1)||(ny == ly - 1) ) )||
                     ( ny==ly && ( (nx == lx + 1)||(nx == lx - 1) ) )
                    ){
                        let canselect = true;
                      
                        if(this.objs[0].selectedzahyous.length > 0){
                          for(let v=0;v<this.objs[0].selectedzahyous.length;v++){
                            if(this.objs[0].selectedzahyous[v].toString() == [nx,ny].toString())canselect = false;
                          
                          }
                        }
                        if(canselect){      
                        
                             this.lastpoint = jouhou;
                             
                             this.add(new Conectline(lx,ly,nx,ny),true);
                      
                             //選択される
                             if(this.objs[0].selectedzahyous.length == 0 || this.objs[0].selectedzahyous[this.objs[0].selectedzahyous.length - 1].toString() != [lx,ly].toString()){
                                this.objs[0].selectedzahyous.push([lx,ly]);
                             }
                             this.objs[0].selectedzahyous.push([nx,ny]);
                        }
                    }
                       
                     
                }
                
                if(jouhou[0] == 'touchend'){
                  
                }
                
              }
              
            }
          }
        }

      
      }
      
    
  
    
    

    
    
  }
  return scene;
}
  

  //game.add( titlescene() );
  game.add( puzzlescene() );
  
  game.start();
  
};
