let thesmoke1;
let thesmoke2;
let frames = 0;
let onefirst = false;
function setup() {
  createCanvas(600, 900);
  
  angleMode(DEGREES);
  pixelDensity(1);
  // background('#ababbf');
  
  thesmoke1 = new Lung(width/3,height/2,'#c94277','#23ce6b');
  thesmoke2 = new Lung(width/3*2,height/2,'#c94277','#a8c256');
  

}

function draw() {
  frames++;
  if (frames>20000){
    noLoop();
  }
  if (frames%1080==0){
    onefirst=!onefirst;
  }
  background(0,50);
  // smokeLayer();

  if (onefirst)
  {
    thesmoke1.show();
    thesmoke2.show();

  }
  else{
    thesmoke2.show();
    thesmoke1.show();
    

  }


}

function pencilline(x1,y1,x2,y2,s1,s2){

  for (let i=x1; i<=x2;i++){
    for (let j=y1; j<y2;j++){
      let neww = map(noise(i*.03),0,1,s1,s2);
      strokeWeight(neww);
      point(i,j);
    }
  }

}


function spray(x1,y1,x2,y2,s1,s2){
  let slope = (y2-y1)/(x2-x1);
  let intcept = y2 - slope*x2;
  for (let xx=0;xx<10;xx+=1){
    let xmap = map(xx,0,9,x1,x2);
    let myval = intcept + xmap*slope;
    let neww = map(noise(xx*.9),0,1,s1,s2);
    strokeWeight(neww);
    point(xmap,myval);
  }




}



function splat(x,y,sc)
{
  stroke('lime');
  
  push();
  translate(x,y);
  for (let i=0;i<360;i+=3){
    var newx = sin(i) * sc;
    var newy = cos(i) * sc;
    let neww = map(noise(i*.1),0,1,7,12);
    strokeWeight(neww);
    spray(0,0,newx,newy,5,15);
  }
  pop();

}

function smokeLayer(){
  for (let i=0;i<width;i+=3){
    // for (let j=0; j<height; j+=1.69){

      let newcolor = map(noise(i*.02),0,1,0,255);
      let newbr = 20;//map(noise(i*.01),0,1,0,255);
      newcolor = color(newcolor,newbr);
      stroke(newcolor);
      line(i,0,i,height);

    // }

  }
}
