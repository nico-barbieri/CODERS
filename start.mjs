import { collisions } from "./data/collisions.mjs";

const $canvas = document.querySelector('#view');
const c = $canvas.getContext('2d');
$canvas.width = 1024;
$canvas.height = 576;
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
        c.fillStyle = 'red';
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

console.log(boundaries);

let map = new Image();
map.src = './res/img/maps/stage_0.png';

let playerImg = new Image();
playerImg.src = './res/img/test/Bob_run_16x16.png';
playerImg.style.scale = 4;

map.onload = () => {
    c.drawImage(map, offset.x, offset.y);
    c.drawImage(playerImg, 0, 0,
        playerImg.width/24, playerImg.height,
        $canvas.width/4 - playerImg.width/24, $canvas.height/2 - playerImg.height/2,
        playerImg.width/24, playerImg.height)
}

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const stage = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map,
})
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
}
function animate() {
    window.requestAnimationFrame(animate);
    stage.draw();
    boundaries.forEach(boundaries => {
        boundaries.draw();
    })
    c.drawImage(
        playerImg, 0, 0,
        playerImg.width/24, playerImg.height,
        $canvas.width/2 - playerImg.width/24/2, $canvas.height/2 - playerImg.height/2,
        playerImg.width/24, playerImg.height
        )

    if (keys.right.pressed && lastkey == 'right') {
        stage.position.x -= playerSpeed;
        boundaries.position.x += playerSpeed;
    } else if (keys.left.pressed && lastkey == 'left') {
        stage.position.x += playerSpeed;
        boundaries.position.x += playerSpeed;
    } else if (keys.up.pressed && lastkey == 'up') {
        stage.position.y += playerSpeed;
        boundaries.position.y += playerSpeed;
    } else if (keys.down.pressed && lastkey == 'down') {
        stage.position.y -= playerSpeed;
        boundaries.position.y += playerSpeed;
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
        default: console.log('not the right key');
        lastkey = '';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            console.log('right');
            keys.right.pressed = false;
            break;
        case 'ArrowLeft':
            console.log('left');
            keys.left.pressed = false;
            break;
        case 'ArrowUp':
            console.log('up');
            keys.up.pressed = false;
            break;
        case 'ArrowDown':
            console.log('down');
            keys.down.pressed = false;
            break;
        default: console.log('not the right key');
            break;
    }
});