
import { Sprite, Boundary, Stage } from "./js/classes.mjs";
import { getCollision } from "./data/collisions.mjs";
const collisions = await getCollision('./data/stage_0_collisions.json');

//variables initialization
const globalScale = 4; //scale of pixel art (400%)
//create images
let map = new Image();
map.src = './res/img/maps/stage_0.png';

let mapForeground = new Image();
mapForeground.src = './res/img/maps/stage_0_foreground_REFINED.png';

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

//offset of the map
let offset = {
    x: -620,
    y: -3700,
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
for (let i = 0; i < collisions.length; i+=90) {
    collisionMaps.level_0.push(collisions.slice(i,90 +i));    
}
//create boundaries array and populate it
let boundaries = [];
collisionMaps.level_0.forEach((row, i) =>{
    row.forEach((symbol, j) => {
        if (symbol !== 0) {
            switch (symbol) {
                case 1387:
                    boundaries.push(
                        new Boundary({
                            globalScale,
                            stage: level_0,
                            position: {
                                x: (64 * j) + offset.x,
                                y: (64 * i) + offset.y,
                            }
                        })
                    )
                    break;

                case 1388:
                    boundaries.push(
                        new Boundary({
                            globalScale,
                            stage: level_0,
                            position: {
                                x: (64 * j) + offset.x,
                                y: (64 * i) + offset.y,
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

                case 1389:
                    boundaries.push(
                        new Boundary({
                            globalScale,
                            stage: level_0,
                            position: {
                                x: (64 * j) + offset.x,
                                y: (64 * i) + offset.y,
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
                case 1390:
                    boundaries.push(
                        new Boundary({
                            globalScale,
                            stage: level_0,
                            position: {
                                x: (64 * j) + offset.x,
                                y: (64 * i) + offset.y,
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
                            globalScale,
                            stage: level_0,
                            position: {
                                x: (64 * j) + offset.x,
                                y: (64 * i) + offset.y,
                            }
                        })
                    )
                    break;
            }
        }
    })
})

//function to detect collisions ("-8" is added to adjust collision distance)
function rectangularCollision({sprite1, sprite2}) {
    return (sprite1.position.x + sprite1.width - 8 > sprite2.position.x &&
        sprite1.position.x < sprite2.position.x + sprite2.width - 8 &&
        sprite1.position.y + sprite1.height > sprite2.position.y &&
        sprite1.position.y + sprite1.height/1.6< sprite2.position.y + sprite2.height)
}


//create sprites
const stageBackground = new Sprite({
    stage: level_0,
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map,
})

const stageForeground = new Sprite({
    stage: level_0,
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: mapForeground,
})

const player = new Sprite({
    stage: level_0,
    image: playerDown,
    cutBorder: {
        x: 0,
        y: 1,
    },
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
        active: true,
        src: playerShadow,
    }
})
//create array of movables object
const movables = [stageBackground, ...boundaries, stageForeground]


function animate() {
    window.requestAnimationFrame(animate);

    //reset player speed every frame based on shift.pressed value
    playerSpeed = 5
    if (keys.shift.pressed) {
        playerSpeed = 10;
        player.frames.hold = 5;
    }
    if (!keys.shift.pressed) {
        playerSpeed = 5;
        player.frames.hold = 7;
        if (!player.moving) player.frames.hold = 27;
    }
    
    //draw map
    stageBackground.draw();
    //draw boundaries for collisions
    boundaries.forEach(boundaries => {
        boundaries.draw();
    });
    //draw player
    player.draw();
    //draw foreground
    stageForeground.draw()
        
    let obstacle = false;
    player.moving = false;
    //STILL 
    if (lastkey == 'right') player.image = player.sprites.right
    else if (lastkey == 'left') player.image = player.sprites.left
    else if (lastkey == 'up') player.image = player.sprites.up
    else if (lastkey == 'down') player.image = player.sprites.down
    //MOVING
    if (keys.right.pressed && lastkey == 'right') {
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
                console.log('colliding');
                break
            }
        }
        if (!obstacle){
            movables.forEach((movable) => {
                movable.position.x -= playerSpeed;
            })
        }
        
    } else if (keys.left.pressed && lastkey == 'left') {
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
                console.log('colliding');
                break
            }
        }
        if (!obstacle) {
            movables.forEach((movable) => {
                movable.position.x += playerSpeed;
            })
        }
    } else if (keys.up.pressed && lastkey == 'up') {
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
                console.log('colliding');
                break
            }
        }
        if (!obstacle) {
            movables.forEach((movable) => {
                movable.position.y += playerSpeed;
            })
        }
    } else if (keys.down.pressed && lastkey == 'down') {
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
                console.log('colliding');
                break
            }
        }
        if (!obstacle) {
            movables.forEach((movable)=>{
                movable.position.y -= playerSpeed;
            })
        }
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
        case 'ArrowRight':
            keys.right.pressed = true;
            lastkey = 'right';
            break;
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = true;
            lastkey = 'left';
            break;
        case 'w':
        case 'ArrowUp':
            keys.up.pressed = true;
            lastkey = 'up';
            break;
        case 's':
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
        case 'd':
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'w':
        case 'ArrowUp':
            keys.up.pressed = false;
            break;
        case 's':
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