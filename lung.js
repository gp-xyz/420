class Lung{
    constructor(x,y,c,c2){
        this.c=c;
        this.c2=c2;
        this.seed = 69;
        this.count = 0;
        this.r = 88;
        this.prevr = width;
        this.smokes = [];
        this.cracks = [];
        this.pos = createVector(x,y);
        this.newsmokerate =1;
        this.newcrackrate =100;
        this.abscount = 0;


    }
    show(){
        fill(this.c);
        noStroke();
        circle(this.pos.x,this.pos.y,this.r);


        for (let i=0;i<this.cracks.length;i++){
            this.cracks[i].show(this.r);
        }
        let curalph = map(sin(this.count),-1,1,1,0);

        let pupilcolor = lerpColor(color(0),color(this.c2),curalph);
        fill(pupilcolor);
        noStroke();

        let puprad =this.r/10;// map(this.abscount%10000,0,9999,this.r/10,this.r/5);
        circle(this.pos.x,this.pos.y,puprad);


        this.prevr = this.r;
        this.r = map(sin(this.count),-1,1,width*3,50);
        if(this.r<150){
            this.count++;
            if(this.r<100){
                this.count++;
                if(this.r<55 && this.r > 50){
                    this.count -= 2.8;
                }
            }
        }

        this.count++;
        for (let i=0;i<this.smokes.length;i++){
            this.smokes[i].show();
        }

        this.monitor();
    }
    monitor(){
     
        if (this.prevr < this.r){
            //when r is increasing, we attract all smoke
            this.addCrack();
            if(this.seed==-69){
                background(255);
                for (let cr =0;cr<this.newcrackrate;cr++){
                this.addCrack();
                }
                // this.smokes = [];
            }

            for (let i=0;i<this.smokes.length;i++){
                let newx = this.pos.x-this.smokes[i].pos.x;
                let newy = this.pos.y-this.smokes[i].pos.y;
                let newforce=createVector(newx,newy);
                var dsquared = newforce.magSq();
                var Gmag = 100 /  constrain(dsquared,200,1000); 
                newforce.setMag(Gmag);

                this.smokes[i].c=this.c2;
                this.smokes[i].applyForce(newforce);
                this.smokes[i].userandc = false;
            }
            this.seed=69;

                    //finally we check if particles are inside the black dot
        for (let i=0;i<this.smokes.length;i++){
            let thedist = p5.Vector.dist(this.smokes[i].pos,this.pos);
            // print('gg',thedist,this.smokes[i].pos,this.pos);
            // noLoop();
            if (thedist<this.r/10){
                this.smokes[i].toggleOff(this.pos);
                this.abscount++;
            }
        }
        }
        else if(this.prevr > this.r){


            if(this.seed==69){
                background(0);
                this.smokes = [];
            }

            //r is decreasing, so we blow it out
            for (let i=0;i<this.smokes.length;i++){
                let newx = this.smokes[i].pos.x-this.pos.x;
                let newy = this.smokes[i].pos.y-this.pos.y;
                let newforce=createVector(newx,newy);
                var dsquared = newforce.magSq();
                var Gmag = 100 /  constrain(dsquared,200,1000); 
                newforce.setMag(Gmag);


                this.smokes[i].applyForce(newforce);
                this.smokes[i].visible=true;
                this.smokes[i].userandc = true;
            }
            //we also generate some new smoke
            for (let i=0;i<this.newsmokerate;i++){
                // if (this.count<200)
                let randangle =random(0,360);
                let altr = random(0,10);// this.r * noise(i*.1);
                let newx = this.pos.x + sin(randangle) * altr;
                let newy = this.pos.y + cos(randangle) * altr;
                let newsmoker = new Smoke(newx,newy,this.c2);
                this.smokes.push(newsmoker);
                
            }
            this.seed=-69;
        }
        else {
            noLoop();
        }


    }

    addCrack(){
        let randangle = random(0,360);
        let randangle2 = random(-40,40);
        let ptl = [randangle,randangle+randangle2,randangle];

        let newcrack = new Crack(this.pos,ptl);
        this.cracks.push(newcrack);
    }
}