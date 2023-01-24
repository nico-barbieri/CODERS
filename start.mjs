import { collisions } from "./data/collisions.mjs";
import { Sprite, Boundary } from "./js/classes.mjs";

const $canvas = document.querySelector('#view');

export const c = $canvas.getContext('2d');
export const globalScale = 4;

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
c.fillStyle = 'black';
c.fillRect(0, 0, $canvas.width, $canvas.height);
let playerSpeed = 5
let lastkey = 'down';

let collisionMaps = {
    0: [],
} 

for (let i = 0; i < collisions.stage0.length; i+=90) {
    collisionMaps[0].push(collisions.stage0.slice(i,90 +i));    
}

const boundaries = [];
let offset = {
    x: -600,
    y: -3750,
}
collisionMaps[0].forEach((row, i) =>{
    row.forEach((symbol, j) =>{
        if (symbol === 1339) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: (64 * j) + offset.x,
                        y: (64 * i) + offset.y,
                    }
                })
            )
        }
    })
})

let map = new Image();
map.src = './res/img/maps/stage_0.png';

let mapForeground = new Image();
mapForeground.src = './res/img/maps/stage_0_foreground.png';

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


function rectangularCollision({sprite1, sprite2}) {
    return (sprite1.position.x + sprite1.width - 8 >= sprite2.position.x &&
        sprite1.position.x <= sprite2.position.x + sprite2.width - 8 &&
        sprite1.position.y + sprite1.height >= sprite2.position.y &&
        sprite1.position.y <= sprite2.position.y - sprite2.height/2)
}



const stage = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map,
})

const stageForeground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: mapForeground,
})

const player = new Sprite({
    position: {
        x: $canvas.width/2 - 384/6/2,
        y: $canvas.height/2 - 128/2,
    },
    image: playerDown,
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
    }
})

const movables = [stage, ...boundaries, stageForeground]

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
        if (player.moving) {
            player.frames.hold = 7;
        } else {
            player.frames.hold = 27;
        }
    }
    
    //draw map
    stage.draw();
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

animate();


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