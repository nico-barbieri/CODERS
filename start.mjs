import { collisions } from "./data/collisions.mjs";

const $canvas = document.querySelector('#view');
const c = $canvas.getContext('2d');
//$canvas.width = 1024;
//$canvas.height = 576;

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
c.fillStyle = 'black';
c.fillRect(0, 0, $canvas.width, $canvas.height);
let playerSpeed = 5

let collisionMaps = {
    0: [],
} 

for (let i = 0; i < collisions.stage0.length; i+=70) {
    collisionMaps[0].push(collisions.stage0.slice(i,70 +i));    
}

class Boundary {
    constructor({position}) {
        this.position = position;
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'transparent';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];
let offset = {
    x: -50,
    y: -3250,
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

let playerImg = new Image();
playerImg.src = './res/img/test/Bob_run_16x16.png';
playerImg.style.scale = 4;

function rectangularCollision({sprite1, sprite2}) {
    return (sprite1.position.x + sprite1.width - 8 >= sprite2.position.x &&
        sprite1.position.x <= sprite2.position.x + sprite2.width - 8 &&
        sprite1.position.y + sprite1.height >= sprite2.position.y &&
        sprite1.position.y <= sprite2.position.y - sprite2.height/2)
}

class Sprite {
    constructor({position, velocity, image, frames = 1 }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () =>{
            this.width = this.image.width / this.frames;
            this.height = this.image.height;
        }
    }

    draw() {
        c.drawImage(this.image,
            0, 0,
            this.image.width / this.frames, this.image.height,
            this.position.x, this.position.y,
            this.image.width / this.frames, this.image.height);
    }
}

const stage = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map,
})

const player = new Sprite({
    position: {
        x: $canvas.width/2 - 1536/24/2,
        y: $canvas.height/2 - 128/2,
    },
    image: playerImg,
    frames: 24,
})

const movables = [stage, ...boundaries]

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
    playerSpeed = 5
    if (keys.shift.pressed) {
        playerSpeed = 10;
    };
    if (!keys.shift.pressed) {
        playerSpeed = 5;
    }
    window.requestAnimationFrame(animate);
    stage.draw();
    boundaries.forEach(boundaries => {
        boundaries.draw();
    });
    player.draw();
    c.drawImage(
        playerImg, 0, 0,
        playerImg.width/24, playerImg.height,
        $canvas.width/2 - playerImg.width/24/2, $canvas.height/2 - playerImg.height/2,
        playerImg.width/24, playerImg.height
        )
        
    let obstacle = false;
    if (keys.right.pressed && lastkey == 'right') {
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

let lastkey = '';
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
        default: console.log('e');
            break;
    }
});