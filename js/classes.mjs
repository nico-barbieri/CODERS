import { /*c,*/ globalScale } from "../start.mjs";

export class Stage {
    constructor(config) {
        this.canvas = config.canvas;
        this.c = this.canvas.getContext('2d');
    }

    fullscreen(){
        this.canvas.width = Math.ceil(window.innerWidth);
        this.canvas.height = Math.ceil(window.innerHeight);
    }

    init(){
        console.log('Hello coder!');
        this.c.fillStyle = 'black';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Sprite {
    constructor({stage, position, cutBorder={x: 0, y: 0}, velocity, image, frames = {max:1}, sprites = {}, shadow = {active: false}}) {
        this.stage = stage;
        this.c = this.stage.c;
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.cutBorder = cutBorder;
        this.image.onload = () =>{
            this.width = (this.image.width / this.frames.max);
            this.height = (this.image.height);
        }
        this.moving = false;
        this.sprites = sprites;
        this.shadow = shadow;
    }

    draw() {
        if (this.shadow.active) {
            this.c.drawImage(
                this.shadow.src,
                this.stage.canvas.width/2 - 32, this.stage.canvas.height/2,
            )
        }
        this.c.drawImage(
            this.image, 
            this.frames.val * this.width + 0.5, //"+0.5&-0.5" to slightly crop the frame and avoid flickering borders
            0,
            (this.image.width / this.frames.max) - 0.5, this.image.height, 
            this.position.x, this.position.y,
            this.image.width / this.frames.max, this.image.height,
        );

       
        if (this.frames.max > 1) {
            this.frames.elapsed++ 
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0;    
        }   
        
    }
}

export class Boundary {
    constructor({stage, position, scale = {x: 1, y: 1}, offset = {x: 0, y: 0}}) {
        this.stage = stage;
        this.c = this.stage.c
        this.scale = scale;
        this.offset = offset;
        this.position = {...position}
        this.position.x += (this.offset.x * globalScale);
        this.position.y += (this.offset.y * globalScale);
        this.width = 16 * globalScale * this.scale.x;
        this.height = 16 * globalScale * this.scale.y;
    }

    draw() {
        this.c.fillStyle = 'transparent';
        this.c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height,
            );
    }
}