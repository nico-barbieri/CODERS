import { getCollision } from "./data/collisions.mjs";
const collisions = await getCollision('./data/page_bkg_collisions.json');
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
        this.canvas.width = Math.ceil(document.body.scrollHeight) * this.proportions;
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
            0,
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


let scaleRatio = .5
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
    scaleRatio = document.body.scrollHeight/map.height;
    setBoundaries();
    animate();
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
    proportions: 48/28,
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
let walkableTiles = [];
const setBoundaries = () => {
    collisionMaps.level_0.forEach((row, i) =>{
        row.forEach((symbol, j) => {
            if (symbol !== 0) {
                const code = collisionMaps.level_0[0][0];
                switch (symbol) {
                    case code:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: level_0,
                                position: {
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
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
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
                                },
                                scale: {
                                    x: 1,
                                    y: 12/16 - 0.01,
                                },
                                offset: {
                                    x: 0,
                                    y: 7,
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
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
                                },
                                scale: {
                                    x: 1,
                                    y: 12/16 - 0.01,
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
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
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
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
                                }
                            })
                        )
                        break;
                }
            } else {
                walkableTiles.push(
                    {
                        x: (16 * globalScale * scaleRatio * j),
                        y: (16 * globalScale * scaleRatio * i) + offset.y - 32*globalScale*scaleRatio/2,
                    }                      
                )
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
        y:document.body.scrollHeight//window.innerWidth/(16/9)
    },
    proportions: 48/28,
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
        y:document.body.scrollHeight//window.innerWidth/(16/9)
    },
    proportions: 48/28,
    image: mapForeground,
})

const randomPick = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

let playerConfig = {
    stage: level_0,
    image: playerDown,
    cutBorder: {
        x: 0,
        y: 1,
    },
    scaleDown: scaleRatio,
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
    },
    position: {
        x: level_0.canvas.width/2 - 32,
        y: level_0.canvas.height/2 - 64,
    },
    obstacle: false,
}
const controlled = new Sprite ({...playerConfig, image: playerWalkingRight, controlled: true})

const player1 = new Sprite({...playerConfig});

const player2 = new Sprite({...playerConfig, image: playerRight});

const player3 = new Sprite({...playerConfig, image: playerLeft});

const player4 = new Sprite({...playerConfig, image: playerUp});

const player5 = new Sprite({...playerConfig, image: playerWalkingDown});

const player6 = new Sprite({...playerConfig, image: playerWalkingUp});

const players = [player1, player2, player3, player4, player5, player6, controlled];

function animate() { 
    window.requestAnimationFrame(animate);
    //reset player speed every frame based on shift.pressed value
    playerSpeed = 1
    if (keys.shift.pressed) {
        playerSpeed = 1;
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
    //draw players
    players.forEach(player =>{
        if (player.frames.elapsed === 0) player.position = randomPick(walkableTiles)
    })
        
    let uniques = new Set (players.map(player => player.position))
    while(uniques.size !== players.length) {
        console.log('repositioning players...');
        players.forEach(player =>{
            player.position = randomPick(walkableTiles)
        })
        uniques = new Set (players.map(player => player.position))
    }

    players.forEach(player =>{
        player.draw();
        player.moving = false;
    })   
        
    //draw foreground
    stageForeground.draw()
        
    
    let obstacle = false;
    players.forEach(player =>{
        
        //STILL 
        if (player.lastkey == 'right') player.image = player.sprites.right
        else if (player.lastkey == 'left') player.image = player.sprites.left
        else if (player.lastkey == 'up') player.image = player.sprites.up
        else if (player.lastkey == 'down') player.image = player.sprites.down
 
        //MOVING
        if (player.random>0 && player.random<5 && !obstacle && !player.controlled) {
            if (player.random === 1) {
                player.lastkey = 'right';
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
                                x: boundary.position.x,
                                y: boundary.position.y
                            }
                            }
                        })
                    ) {
                        obstacle = true;
                        ////console.log('colliding');
                        break
                    }
                }
                if (!obstacle && player.moving){
                    
                        player.position.x += playerSpeed;
                    
                }
                
            } else if (player.random === 2) {
                player.lastkey = 'left';

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
                        ////console.log('colliding');
                        break
                    }
                }
                if (!obstacle && player.moving) {
                    
                        player.position.x -= playerSpeed;
                    
                }
            } else if (player.random === 3) {
                player.lastkey = 'up';

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
                        ////console.log('colliding');
                        break
                    }
                }
                if (!obstacle && player.moving) {
                    
                        player.position.y -= playerSpeed;
                    
                }
            } else if (player.random === 4) {
                player.lastkey = 'down';
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
                        ////console.log('colliding');
                        break
                    }
                }
                if (!obstacle && player.moving) {
                    
                        player.position.y += playerSpeed;
                    
                }
            }
        } else {
            player.moving = false;
        }

        
    })


    //STILL 
    if (controlled.lastkey == 'right') controlled.image = controlled.sprites.right
    else if (controlled.lastkey == 'left') controlled.image = controlled.sprites.left
    else if (controlled.lastkey == 'up') controlled.image = controlled.sprites.up
    else if (controlled.lastkey == 'down') controlled.image = controlled.sprites.down

    controlled.obstacle = false;

    if (keys.right.pressed && lastkey == 'right') {
        controlled.lastkey = 'right';
        controlled.moving = true;
        controlled.image = controlled.sprites.walk.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    sprite1: controlled,
                    sprite2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - playerSpeed,
                        y: boundary.position.y
                    }
                    }
                })
            ) {
                controlled.obstacle = true;
                //console.log('colliding');
                break
            }
        }
        if (!controlled.obstacle){
            
                controlled.position.x += playerSpeed;
            
        }
        
    } else if (keys.left.pressed && lastkey == 'left') {
        controlled.lastkey = 'left';
        controlled.moving = true;
        controlled.image = controlled.sprites.walk.left;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    sprite1: controlled,
                    sprite2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x + playerSpeed,
                        y: boundary.position.y
                    }
                    }
                })
            ) {
                controlled.obstacle = true;
                //console.log('colliding');
                break
            }
        }
        if (!controlled.obstacle) {
                controlled.position.x -= playerSpeed;
        }
    } else if (keys.up.pressed && lastkey == 'up') {
        controlled.lastkey = 'up';
        controlled.moving = true;
        controlled.image = controlled.sprites.walk.up;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    sprite1: controlled,
                    sprite2: {
                        ...boundary,
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y + playerSpeed,
                    }
                    }
                })
            ) {
                controlled.obstacle = true;
                //console.log('colliding');
                break
            }
        }
        if (!controlled.obstacle) {
                controlled.position.y -= playerSpeed;
        }
    } else if (keys.down.pressed && lastkey == 'down') {
        controlled.lastkey = 'down';
        controlled.moving = true;
        controlled.image = controlled.sprites.walk.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    sprite1: controlled,
                    sprite2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - playerSpeed,
                    }
                    }
                })
            ) {
                controlled.obstacle = true;
                //console.log('colliding');
                break
            }
        }
        if (!controlled.obstacle) {
                controlled.position.y += playerSpeed;
        }
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.right.pressed = true;
            lastkey = 'right';
            break;
        case 'a':
            keys.left.pressed = true;
            lastkey = 'left';
            break;
        case 'w':
            keys.up.pressed = true;
            lastkey = 'up';
            break;
        case 's':
            keys.down.pressed = true;
            lastkey = 'down';
            break;
        case 'Shift':
            keys.shift.pressed = true;
            break;
        default: //console.log(e);
        lastkey = '';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.right.pressed = false;
            break;
        case 'a':
            keys.left.pressed = false;
            break;
        case 'w':
            keys.up.pressed = false;
            break;
        case 's':
            keys.down.pressed = false;
            break;
        case 'Shift':
            keys.shift.pressed = false;
            break;
        default:
            break;
    }
});

