import { c, globalScale } from "../start.mjs";
export class Sprite {
    constructor({position, velocity, image, frames = {max:1}, sprites = {}}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.moving = false;
        this.sprites = sprites;
    }

    draw() {
        c.drawImage(this.image, 
            this.frames.val * this.width, 
            0,
            this.image.width / this.frames.max, this.image.height,
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
    constructor({position}) {
        this.position = position;
        this.width = 16 * globalScale
        this.height = 16 * globalScale
    }

    draw() {
        c.fillStyle = 'transparent';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}