class Smoke{
    constructor(x,y,c='red'){
        this.c=c;
        this.randc = color(random(255),random(255),random(255));
        this.userandc = false;
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.visible = true;
    }

    show(){
        strokeWeight(25);
        stroke(this.c);
        if (this.userandc){
            strokeWeight(15);
            stroke(this.randc);
        }
        if (this.visible){
        point(this.pos.x,this.pos.y);
        }
        // point(10,10);

    }

    applyForce(force){
        if (force==0){
            this.acc=createVector(0,0);
            this.vel=createVector(0,0);
        }
        this.acc=force;
        this.update();
        
        // this.x += force.x;
        // this.y += force.y;
    }

    toggleOff(newpos){
        this.visible = false;
        this.applyForce(0);
        this.pos = newpos;
    }
    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.edges();
    }
    edges(){
        if (this.pos.x < 0){
            this.pos.x = 0 - this.pos.x;
            this.vel.x = 1;
            if (this.userandc)
            {
                this.visible=false;
            }
        }
        if (this.pos.y < 0){
            this.pos.y = 0 - this.pos.y;
            this.vel.y=1;
            if (this.userandc)
            {
                this.visible=false;
            }
        }
        if (this.pos.x >width){
            this.pos.x = this.pos.x - width;
            this.vel.x = -1;
            if (this.userandc)
            {
                this.visible=false;
            }
        }
        if (this.pos.y >height){
            this.pos.y = this.pos.y - height;
            this.vel.y=-1;
            if (this.userandc)
            {
                this.visible=false;
            }
        }
    }
}
