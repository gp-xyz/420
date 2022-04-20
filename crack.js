class Crack{
    constructor(sp,ptl){
        this.sp=sp;
        this.ptl=ptl;
    }
    show(r){
        strokeWeight(5);
        stroke(color(235,4,5,50));
        noFill();
        beginShape();
        vertex(this.sp.x,this.sp.y);

        for (let i=0;i<this.ptl.length;i++){
            let ang = this.ptl[i];
            let newr = map(i,0,this.ptl.length-1,.1,.9) * r/2;
            let newx = this.sp.x+ sin(ang) * newr ;
            let newy = this.sp.y+ cos(ang) * newr;

            vertex(newx,newy);
            // print(ang,newr,newx,newy);
        }
        endShape();
    }
}