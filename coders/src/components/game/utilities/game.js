//function to pick a random element from an array
const randomPick = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

/* export const getCollision = async (directory, layerName = 'collisions') => {
    console.log(directory);
    const response = await fetch(directory);
    console.log(response.json());
    const data = await response.json();
    const collisionLayer = data.layers.filter((layer) => {
        return layer.name == layerName;
    })
    return collisionLayer[0].data;
} */

export const getCollision = async (data, layerName = 'collisions') => {
    const collisionLayer = data.layers.filter((layer) => {
        return layer.name == layerName;
    })
    return collisionLayer[0].data;
}



/**
 * 
 * @param {object} stage an object which must contain two "Background", a background map and a foreground map
 * @param {array} players an array which must contain various player, which are instances of Sprite
 * @param {array} boundaries an array which must contain boundaries to collide with
 * @param {array} walkableTiles an array which must contain free tiles (to spawn players, for example)
 * @param {keys} keys the keys object which must be imported from utilities
 * @param {object} options an options object (with speed.walk, speed.run)
 */

export function animate({
    frameCount = 0, 
    stage, 
    players, 
    boundaries, 
    walkableTiles,
    keys, 
    options = {
        speed: {walk: 1, run: 2},
    }
}) { 

    //find controlled player in players array, if present
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