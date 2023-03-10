
import { getCollision } from "../../../public/game/data/collisions.mjs";
import { Stage, Background, Sprite, Boundary } from "./utilities/gameClasses.js";
import { keys, setPressed, unsetPressed } from "./utilities/keys.js";

export default Game = () => {

}

//variables initialization
let scaleRatio = .5
const globalScale = 4; //scale of pixel art (400%)
const numberOfSections = 3;

//create images
let gameMap = new Image();
gameMap.src = './data/res/img/maps/page_bkg.png';

gameMap.onload = () =>{
    scaleRatio = document.body.scrollHeight/gameMap.height;
    setBoundaries();
    animate();
};

let mapForeground = new Image();
mapForeground.src = './data/res/img/maps/page_bkg_foreground_REFINED.png';

let playerUp = new Image();
playerUp.src = './data/res/img/sprites/player_0_up.png';
let playerWalkingUp = new Image();
playerWalkingUp.src = './data/res/img/sprites/player_0_walk_up.png';

let playerDown = new Image();
playerDown.src = './data/res/img/sprites/player_0_down.png';
let playerWalkingDown = new Image();
playerWalkingDown.src = './data/res/img/sprites/player_0_walk_down.png';

let playerRight = new Image();
playerRight.src = './data/res/img/sprites/player_0_right.png';
let playerWalkingRight = new Image();
playerWalkingRight.src = './data/res/img/sprites/player_0_walk_right.png';

let playerLeft = new Image();
playerLeft.src = './data/res/img/sprites/player_0_left.png';
let playerWalkingLeft = new Image();
playerWalkingLeft.src = './data/res/img/sprites/player_0_walk_left.png';

let playerShadow = new Image();
playerShadow.src =  './data/res/img/sprites/shadow.png';


//create "keys" object


let lastkey = 'down'; // the game starts with the frontal view of the player

//player normal speed
let playerSpeed = 5 


//create stage
let page_bkg = new Stage({
    canvas: document.querySelector('#view'),
    proportions: 48/(28 * numberOfSections),
});
//init stage
page_bkg.fullscreen();
page_bkg.init();

/************/
/*COLLISIONS*/
/************/
const collisions = await getCollision('./data/page_bkg_collisions.json');

//collection of collisions maps as arrays of arrays based on number map width in tiles
let collisionMaps = {
    page_bkg: [],
} 

//populate page_bkg collision map
for (let i = 0; i < collisions.length; i+=48) {
    collisionMaps.page_bkg.push(collisions.slice(i,48 +i));    
}

//create boundaries/walkables array and populate it
let boundaries = [];
let walkableTiles = [];

const setBoundaries = () => {
    collisionMaps.page_bkg.forEach((row, i) =>{
        row.forEach((symbol, j) => {
            if (symbol !== 0) {
                const code = collisionMaps.page_bkg[0][0];
                switch (symbol) {
                    case code:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: page_bkg,
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
                                stage: page_bkg,
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
                                stage: page_bkg,
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
                                stage: page_bkg,
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
                    case code + 4:
                        walkableTiles.push(
                            {
                                x: (16 * globalScale * scaleRatio * j) + offset.x,
                                y: (16 * globalScale * scaleRatio * i) + offset.y - 32*globalScale*scaleRatio/3,
                            }                      
                        )
                        break;
                    
                        default:
                        boundaries.push(
                            new Boundary({
                                scaleRatio,
                                globalScale,
                                stage: page_bkg,
                                position: {
                                    x: (16 * globalScale * scaleRatio * j) + offset.x,
                                    y: (16 * globalScale * scaleRatio * i) + offset.y,
                                }
                            })
                        )
                        break;
                }
            }
        })
    })
}

//function to detect collisions
function rectangularCollision({sprite1, sprite2}) {
    return (sprite1.position.x + sprite1.width > sprite2.position.x &&
        sprite1.position.x < sprite2.position.x + sprite2.width &&
        sprite1.position.y + sprite1.height > sprite2.position.y &&
        sprite1.position.y + sprite1.height/1.6< sprite2.position.y + sprite2.height)
}

//function to pick a random element from an array
const randomPick = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

//offset of the map
let offset = {
    x: page_bkg.canvas.width/2 - (document.body.scrollHeight*48/(28 * numberOfSections))/2,
    y: 0,
}

//create sprites
const stageBackground = new Background({
    stage: page_bkg,
    position: {
        x: offset.x,
        y: offset.y,
    },
    dimensions: {
        x:window.innerWidth,
        y:document.body.scrollHeight
    },
    proportions: 48/(28 * numberOfSections),
    image: gameMap,
})

const stageForeground = new Background({
    stage: page_bkg,
    position: {
        x: offset.x,
        y: offset.y,
    },
    dimensions: {
        x:window.innerWidth,
        y:document.body.scrollHeight
    },
    proportions: 48/(28 * numberOfSections),
    image: mapForeground,
})

let playerConfig = {
    stage: page_bkg,
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
        x: page_bkg.canvas.width/2 - 32,
        y: page_bkg.canvas.height/2 - 64,
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

const player7 = new Sprite({...playerConfig, image: playerWalkingLeft});

const players = [player1, player2, player3, player4, player5, player6, player7, controlled];

function animate({
    frameCount = 0, 
    stage, 
    players, 
    boundaries, 
    walkableTiles,
    keys, 
    options: {
        speed: {walk = 1, run = 2},
    }
}) { 

    animationFrameId = window.requestAnimationFrame(animate);

    const controlled = players.find(el => el.controlled = true);

    //reset player speed every frame based on shift.pressed value
    let playerSpeed = options.speed.walk || 5;

    if (keys.shift.pressed) {
        playerSpeed = options.speed.run || 10;
        players.forEach(player => {
            player.frames.hold = 5;
        })
    }
    if (!keys.shift.pressed) {
        playerSpeed = speed.walk;
        players.forEach(player => {
            player.frames.hold = 7;
            if (!player.moving) player.frames.hold = 27;
        }) 
    }
    
    //draw map
    stage.stageBackground.draw();
    //draw boundaries for collisions
    boundaries.forEach(boundaries => {
        boundaries.draw();
    });
    //draw players

    if (frameCount === 0) {
        players.forEach(player =>{
            player.position = randomPick(walkableTiles);
        })
            
        let uniques = new Set (players.map(player => player.position))
        while(uniques.size !== players.length) {
            console.log('repositioning players...');
            players.forEach(player =>{
                player.position = randomPick(walkableTiles)
            })
            uniques = new Set (players.map(player => player.position))
        }
    }

    //sort players based on their position Y to render them in the right order
    //(this is important to properly show players when one is behind the other)
    players.sort((a,b) => a.position.y - b.position.y)

    players.forEach(player =>{
        player.draw();
        player.moving = false;
    })   
        
    //draw foreground
    stage.stageForeground.draw()
        
    
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
                        } )
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

    frameCount++;
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            setPressed('right');
            lastkey = 'right';
            break;
        case 'a':
            setPressed('left');
            lastkey = 'left';
            break;
        case 'w':
            setPressed('up');
            lastkey = 'up';
            break;
        case 's':
            setPressed('down');
            lastkey = 'down';
            break;
        case 'Shift':
            setPressed('shift');
            break;
        default: //console.log(e);
        lastkey = '';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            unsetPressed('right');
            break;
        case 'a':
            unsetPressed('left');
            break;
        case 'w':
            unsetPressed('up');
            break;
        case 's':
            unsetPressed('down');
            break;
        case 'Shift':
            unsetPressed('shift');
            break;
        default:
            break;
    }
});

const config = {
    stage: {
        stageBackground: stageBackground,
        stageForeground: stageForeground,
    },
    players: players,
    boundaries: boundaries,
}

animate(config);
