export class Stage {
    constructor(config) {
        this.canvas = config.canvas;
        this.c = this.canvas.getContext('2d');
        this.proportions = config.proportions? config.proportions : 16/9
    }
    setDimensions(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
    }
    fullscreen(){
        this.canvas.width = Math.ceil(document.body.scrollWidth);
        this.canvas.height = Math.ceil(document.body.scrollHeight);
    }

    init(){
        console.log('Hello coder!');
        this.c.fillStyle = 'rgb(58,58,80)';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Background {
    constructor({stage, position, proportions=16/9, dimensions={x: 0, y: 0}, scaleDown = 1, velocity, image}) {
        this.stage = stage;
        this.c = this.stage.c;
        this.position = position;
        this.image = image;
        this.proportions = proportions;
        this.dimensions = dimensions;
        this.scaleDown = scaleDown;
        this.moving = false;
    }

    draw() {
        this.c.drawImage(
            this.image, 
            this.stage.canvas.width/2 - (this.dimensions.y*this.proportions)/2,
            0,
            this.dimensions.y*this.proportions, this.dimensions.y
        );        
    }
}

export class Sprite {
    constructor({controlled=false, stage, position, cutBorder={x: 0, y: 0}, scaleDown = 1, velocity, image, frames = {max:1}, sprites = {}, shadow = {active: false}}) {
        this.controlled = controlled;
        this.stage = stage;
        this.c = this.stage.c;
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.cutBorder = cutBorder;
        this.scaleDown = scaleDown;
        this.image.onload = () =>{
            this.width = (this.image.width / this.frames.max * scaleDown);
            this.height = (this.image.height * scaleDown);
        }
        this.moving = false;
        this.sprites = sprites;
        this.shadow = shadow;
        this.random = 0;
        this.interval = 0;
        this.obstacle = false;
        this.lastkey = 'down';
    }
    newRandomPosition () {
        this.position = randomPick(walkableTiles);
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
            this.frames.val * (this.width / this.scaleDown) + 0.5, //"+0.5&-0.5" to slightly crop the frame and avoid flickering borders
            0,
            ((this.image.width / this.frames.max)) - 0.5, this.image.height, 
            this.position.x, this.position.y,
            (this.image.width * this.scaleDown) / this.frames.max, this.image.height * this.scaleDown,
        );

       
        if (this.frames.max > 1) {
            this.frames.elapsed++ 
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0;    
        }   
        if (this.interval%100===0 || this.interval % (Math.floor(Math.random()*100)=== 0)) {
            this.random = Math.floor(Math.random() * 8 + 1);
        }
        this.interval++
    }
}

export class Boundary {
    constructor({globalScale, stage, position, scale = {x: 1, y: 1}, offset = {x: 0, y: 0}, scaleRatio = 1}) {
        this.stage = stage;
        this.c = this.stage.c;
        this.globalScale = globalScale;
        this.scale = scale;
        this.offset = offset;
        this.scaleRatio = scaleRatio;
        this.position = {...position}
        this.position.x += (this.offset.x * this.globalScale * this.scaleRatio);
        this.position.y += (this.offset.y * this.globalScale * this.scaleRatio);
        this.width = 16 * this.globalScale * this.scaleRatio * this.scale.x;
        this.height = 16 * this.globalScale * this.scaleRatio * this.scale.y;
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