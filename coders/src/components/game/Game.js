//UTILITIES
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


/**
 * 
 * @param {array} players an array which contains every player. Players are instances of Sprite Class
 * @param {object} playerSettings an object which must contain various player property: speed.walk, speed.run
 * @param {object} keys an object which keeps track of pressed keys IMPORTANT: keys object must be set in the state
 * 
 */

export const animate = ({players, playerSettings, frameCount = 0, keys, stage, boundaries, walkableTiles}) => {

    //reset player speed on every frame based on shift.pressed value
    let playerSpeed = playerSettings.speed.walk;

    if (keys.shift.pressed) {
        playerSpeed = playerSettings.speed.run || 10;
        players.forEach(player => {
            player.frames.hold = 5;
        })
    }

    if (!keys.shift.pressed) {
        playerSpeed = playerSettings.speed.walk;
        players.forEach(player => {
            player.frames.hold = 7;
            if (!player.moving) player.frames.hold = 27;
        }) 
    }

    //find controlled player if present
    const controlled = players.find(el => el.controlled = true);

    //draw map
    stage.stageBackground.draw();

    //draw boundaries for collisions
    boundaries.forEach(boundary => {
        boundary.draw();
    });

    //draw players

    //at first render, set a random position for every player
    if (frameCount === 0) {
        let uniques = new Set (players.map(player => player.position))
        while (players.length > uniques.size) {
            console.log('repositioning players...');
            players.forEach(player =>{
                player.position = randomPick(walkableTiles)
            })
            uniques = new Set (players.map(player => player.position))
        }

        /* players.forEach(player =>{
            player.position = randomPick(walkableTiles);
        })
            
        while(uniques.size !== players.length) {
            console.log('repositioning players...');
            players.forEach(player =>{
                player.position = randomPick(walkableTiles)
            })
            uniques = new Set (players.map(player => player.position))
        } */
    }

    //sort players based on their position Y to render them in the right order
    //(this is important to properly show players when one is behind the other)
    players.sort((a,b) => a.position.y - b.position.y)

    //after checking, draw players
    players.forEach(player =>{
        player.draw();
        player.moving = false;
    })   

    //draw foreground
    stage.stageForeground.draw()


    //MOVING NPCs
    if (players.some(player => player.controlled !== true)) {
        players.forEach(player =>{
    
            //RESET OBSTACLE
            player.obstacle = false
            
            //STILL 
            if (player.lastkey == 'right') player.image = player.sprites.right
            else if (player.lastkey == 'left') player.image = player.sprites.left
            else if (player.lastkey == 'up') player.image = player.sprites.up
            else if (player.lastkey == 'down') player.image = player.sprites.down
     
            //MOVING
            if (player.random>0 && player.random<5 && !player.obstacle && !player.controlled) {
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
                            player.obstacle = true;
                            ////console.log('colliding');
                            break
                        }
                    }
                    if (!player.obstacle && player.moving){
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
                            player.obstacle = true;
                            ////console.log('colliding');
                            break
                        }
                    }
                    if (!player.obstacle && player.moving) {
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
                            player.obstacle = true;
                            ////console.log('colliding');
                            break
                        }
                    }
                    if (!player.obstacle && player.moving) {
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
                            player.obstacle = true;
                            ////console.log('colliding');
                            break
                        }
                    }
                    if (!player.obstacle && player.moving) {
                            player.position.y += playerSpeed;
                    }
                }
            } else {
                player.moving = false;
            }
        })
    }

    //MOVING CONTROLLED PLAYER
    if (controlled) {
        //STILL 
        if (keys.lastkey == 'right') controlled.image = controlled.sprites.right
        else if (keys.lastkey == 'left') controlled.image = controlled.sprites.left
        else if (keys.lastkey == 'up') controlled.image = controlled.sprites.up
        else if (keys.lastkey == 'down') controlled.image = controlled.sprites.down
    }

    //Reset obstacle
    controlled.obstacle = false;

    if (keys.right.pressed && keys.lastkey == 'right') {
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
    } else if (keys.left.pressed && keys.lastkey == 'left') {
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
    } else if (keys.up.pressed && keys.lastkey == 'up') {
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
    } else if (keys.down.pressed && keys.lastkey == 'down') {
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