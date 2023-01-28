import { getCollision } from "./data/collisions.mjs";
const collisions = await getCollision('./data/page_bkg_collisions.json');
export class Stage {
    constructor(config) {
        this.canvas = config.canvas;
        this.c = this.canvas.getContext('2d');
    }
    setDimensions(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
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
export class Background {
    constructor({stage, position, dimensions={x: 0, y: 0}, scaleDown = 1, velocity, image}) {
        this.stage = stage;
        this.c = this.stage.c;
        this.position = position;
        this.image = image;
        this.dimensions = dimensions;
        this.scaleDown = scaleDown;
        this.moving = false;
    }

    draw() {
        this.c.drawImage(
            this.image, 
            0,
            0,
            this.dimensions.x, this.dimensions.y
        );        
    }
}
export class Sprite {
    constructor({stage, position, cutBorder={x: 0, y: 0}, scaleDown = 1, velocity, image, frames = {max:1}, sprites = {}, shadow = {active: false}}) {
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
        this.interval= 0;
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
    constructor({scaleRatio, globalScale, stage, position, scale = {x: 1, y: 1}, offset = {x: 0, y: 0}}) {
        this.stage = stage;
        this.c = this.stage.c;
        this.globalScale = globalScale;
        this.scaleRatio = scaleRatio;
        this.scale = scale;
        this.offset = offset;
        this.position = {...position}
        this.position.x += (this.offset.x * this.globalScale * this.scaleRatio.x);
        this.position.y += (this.offset.y * this.globalScale * this.scaleRatio.y);
        this.width = 16 * globalScale * this.scale.x * this.scaleRatio.x;
        this.height = 16 * globalScale * this.scale.y * this.scaleRatio.y;
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


let scaleRatio = .5
const body = document.querySelector('body');
//variables initialization
const globalScale = 4; //scale of pixel art (400%)
//create images
let map = new Image();
map.src = './res/img/maps/page_bkg.png';

let mapForeground = new Image();
mapForeground.src = './res/img/maps/page_bkg_foreground_REFINED.png';

let playerUp = new Image();
playerUp.src = './res/img/sprites/player_0_up.png';
let playerWalkingUp = new Image();
playerWalkingUp.src = './res/img/sprites/player_0_walk_up.png';

let playerDown = new Image();
playerDown.src = './res/img/sprites/player_0_down.png';
let playerWalkingDown = new Image();
playerWalkingDown.src = './res/img/sprites/player_0_walk_down.png';
let NPCs = [];
for (let i = 0; i < 6; i++) {
    let npc = new Image();
    npc.src = './res/img/sprites/player_0_down.png';
    npc.onload = () => NPCs.push(npc);
}
let playerRight = new Image();
playerRight.src = './res/img/sprites/player_0_right.png';
let playerWalkingRight = new Image();
playerWalkingRight.src = './res/img/sprites/player_0_walk_right.png';

let playerLeft = new Image();
playerLeft.src = './res/img/sprites/player_0_left.png';
let playerWalkingLeft = new Image();
playerWalkingLeft.src = './res/img/sprites/player_0_walk_left.png';

let playerShadow = new Image();
playerShadow.src =  './res/img/sprites/shadow.png';

map.onload = () =>{
    scaleRatio = {
        x:((body.offsetWidth)/map.width).toFixed(10),
        y:((body.offsetHeight)/map.height).toFixed(10),
    }
    setBoundaries();
};

//offset of the map
let offset = {
    x: 0,
    y: 0,
}

//create "keys" object
const keys = {
    left:  {
        pressed: false,
    },
    right:  {
        pressed: false,
    },
    up:  {
        pressed: false,
    },
    down:  {
        pressed: false,
    },
    shift: {
        pressed: false,
    }
}
let lastkey = 'down'; // the game starts with the frontal view of the player

//player normal speed
let playerSpeed = 5 


//create stage
let level_0 = new Stage({
    canvas: document.querySelector('#view'),
});
//init stage
level_0.fullscreen();
level_0.init();

//////////////
//COLLISIONS//
//////////////

//collection of collisions maps as arrays of arrays based on number map width in tiles
let collisionMaps = {
    level_0: [],
} 
//populate level_0 collision map
for (let i = 0; i < collisions.length; i+=48) {
    collisionMaps.level_0.push(collisions.slice(i,48 +i));    
}

//create boundaries array and populate it
let boundaries = [];
const setBoundaries = () => {
    collisionMaps.level_0.forEach((row, i) =>{
        row.forEach((symbol, j) => {
            if (symbol !== 0) {
                const code = collisionMaps.level_0[0][0];
                switch (symbol) {
                    case code:
                        console.log('here');
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio.x * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio.y * i) + offset.y,
                                }
                            })
                        )
                        break;
    
                    case code + 1:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio.x * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio.y * i) + offset.y,
                                },
                                scale: {
                                    x: 1,
                                    y: 11/16 - 0.01,
                                },
                                offset: {
                                    x: 0,
                                    y: 8,
                                }
                            })
                        )
                        break;
    
                    case code + 2:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio.x * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio.y * i) + offset.y,
                                },
                                scale: {
                                    x: 1,
                                    y: 11/16 - 0.01,
                                },
                                offset: {
                                    x: 0,
                                    y: -0.001,
                                }
                            })
                        )
                        break;
                    case code + 3:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio.x * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio.y * i) + offset.y,
                                },
                                scale: {
                                    x: .25,
                                    y: 1,
                                },
                                offset: {
                                    x: 12,
                                    y: 0,
                                }
                            })
                        )
                        break;
                    default:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio.x * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio.y * i) + offset.y,
                                }
                            })
                        )
                        break;
                }
            }
        })
    })
}

//function to detect collisions ("-8" is added to adjust collision distance)
function rectangularCollision({sprite1, sprite2}) {
    return (sprite1.position.x + sprite1.width > sprite2.position.x &&
        sprite1.position.x < sprite2.position.x + sprite2.width &&
        sprite1.position.y + sprite1.height > sprite2.position.y &&
        sprite1.position.y + sprite1.height/1.6< sprite2.position.y + sprite2.height)
}


//create sprites
const stageBackground = new Background({
    stage: level_0,
    position: {
        x: offset.x,
        y: offset.y,
    },
    dimensions: {
        x:window.innerWidth,
        y:window.innerHeight//window.innerWidth/(16/9)
    },
    image: map,
})

const stageForeground = new Background({
    stage: level_0,
    position: {
        x: offset.x,
        y: offset.y,
    },
    dimensions: {
        x:window.innerWidth,
        y:window.innerHeight//window.innerWidth/(16/9)
    },
    image: mapForeground,
})
let playerConfig = {
    stage: level_0,
    image: playerDown,
    cutBorder: {
        x: 0,
        y: 1,
    },
    scaleDown: scaleRatio,
    position: {
        x: level_0.canvas.width/2 - 32,
        y: level_0.canvas.height/2 - 64,
    },
    frames: {
        max: 6,
        hold: 7,
    },
    sprites: {
        up: playerUp,
        down: playerDown,
        right: playerRight,
        left: playerLeft,
        walk: {
            up: playerWalkingUp,
            down: playerWalkingDown,
            right: playerWalkingRight,
            left: playerWalkingLeft,
        }
    },
    shadow: {
        active: false,
        src: playerShadow,
    }
}
const player1 = new Sprite({...playerConfig});

const player2 = new Sprite({...playerConfig, image: playerRight, 
position: {
    x: level_0.canvas.width/4 - 32,
    y: level_0.canvas.height/2 - 64, 
}});

const player3 = new Sprite({...playerConfig, image: playerLeft, 
position: {
    x: level_0.canvas.width/3.5 - 32,
    y: level_0.canvas.height/4 - 64,
}});

const player4 = new Sprite({
    ...playerConfig, image: playerUp,
    position: {
        x: level_0.canvas.width / 1.4 - 32,
        y: level_0.canvas.height / 1.6 - 64,
    }
});

const player5 = new Sprite({
    ...playerConfig, image: playerWalkingDown,
    position: {
        x: level_0.canvas.width / 4 - 32,
        y: level_0.canvas.height / 1.15 - 64,
    }
});
const player6 = new Sprite({
    ...playerConfig, image: playerWalkingUp,
    position: {
        x: level_0.canvas.width / 1.06 - 32,
        y: level_0.canvas.height / 1.2 - 64,
    }
});
const players = [player1, player2, player3, player4, player5, player6]
/*
const players = [];
NPCs.forEach(npc => {
    players.push(
        new Sprite({
            stage: level_0,
            image: npc,
            cutBorder: {
                x: 0,
                y: 1,
            },
            scaleDown: scaleRatio,
            position: {
                x: level_0.canvas.width / (Math.random()*6 + 1) - 32,
                y: level_0.canvas.height / (Math.random()*6 + 1) - 64,
            },
            frames: {
                max: 6,
                hold: 7,
            },
            sprites: {
                up: playerUp,
                down: playerDown,
                right: playerRight,
                left: playerLeft,
                walk: {
                    up: playerWalkingUp,
                    down: playerWalkingDown,
                    right: playerWalkingRight,
                    left: playerWalkingLeft,
                }
            },
        })
    )
})
*/


let delay=0;
let random=0;
function animate() {
    window.requestAnimationFrame(animate);
    //reset player speed every frame based on shift.pressed value
    playerSpeed = 1
    if (keys.shift.pressed) {
        playerSpeed = 10;
        players.forEach(player => {
            player.frames.hold = 5;
        })
    }
    if (!keys.shift.pressed) {
        playerSpeed = 1;
        players.forEach(player => {
            player.frames.hold = 7;
            if (!player.moving) player.frames.hold = 27;
        }) 
    }
    
    //draw map
    stageBackground.draw();
    //draw boundaries for collisions
    boundaries.forEach(boundaries => {
        boundaries.draw();
    });
    //draw player
    players.forEach(player =>{
        player.draw();
        player.moving = false;
    })
    //draw foreground
    stageForeground.draw()
        
    let obstacle = false;

    players.forEach(player =>{
        //STILL 
        if (lastkey == 'right') player.image = player.sprites.right
        else if (lastkey == 'left') player.image = player.sprites.left
        else if (lastkey == 'up') player.image = player.sprites.up
        else if (lastkey == 'down') player.image = player.sprites.down
    
        //MOVING
        if (player.random>0 && player.random<5) {
            if (player.random === 1) {
                player.moving = true;
                player.image = player.sprites.walk.right;
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            sprite1: player,
                            sprite2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x - 10,
                                y: boundary.position.y
                            }
                            }
                        })
                    ) {
                        obstacle = true;
                        //console.log('colliding');
                        break
                    }
                }
                if (!obstacle){
                    
                        player.position.x += playerSpeed;
                    
                }
                
            } else if (player.random === 2) {
                player.moving = true;
                player.image = player.sprites.walk.left;
        
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            sprite1: player,
                            sprite2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x + playerSpeed,
                                y: boundary.position.y
                            }
                            }
                        })
                    ) {
                        obstacle = true;
                        //console.log('colliding');
                        break
                    }
                }
                if (!obstacle) {
                    
                        player.position.x -= playerSpeed;
                    
                }
            } else if (player.random === 3) {
                player.moving = true;
                player.image = player.sprites.walk.up;
        
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            sprite1: player,
                            sprite2: {
                                ...boundary,
                                position: {
                                x: boundary.position.x,
                                y: boundary.position.y + playerSpeed,
                            }
                            }
                        })
                    ) {
                        obstacle = true;
                        //console.log('colliding');
                        break
                    }
                }
                if (!obstacle) {
                    
                        player.position.y -= playerSpeed;
                    
                }
            } else if (player.random === 4) {
                player.moving = true;
                player.image = player.sprites.walk.down;
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if (
                        rectangularCollision({
                            sprite1: player,
                            sprite2: {
                            ...boundary, 
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - playerSpeed,
                            }
                            }
                        })
                    ) {
                        obstacle = true;
                        //console.log('colliding');
                        break
                    }
                }
                if (!obstacle) {
                    
                        player.position.y += playerSpeed;
                    
                }
            }
        }

    })
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.right.pressed = true;
            lastkey = 'right';
            break;
        case 'ArrowLeft':
            keys.left.pressed = true;
            lastkey = 'left';
            break;
        case 'ArrowUp':
            keys.up.pressed = true;
            lastkey = 'up';
            break;
        case 'ArrowDown':
            keys.down.pressed = true;
            lastkey = 'down';
            break;
        case 'Shift':
            keys.shift.pressed = true;
            break;
        default: console.log(e);
        lastkey = '';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'ArrowUp':
            keys.up.pressed = false;
            break;
        case 'ArrowDown':
            keys.down.pressed = false;
            break;
        case 'Shift':
            keys.shift.pressed = false;
            break;
        default:
            break;
    }
});

animate();