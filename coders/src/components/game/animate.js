import { rectangularCollision, randomPick, detectCollision } from "./Game";

/**
 *
 * @param {array} players an array which contains every player. Players are instances of Sprite Class
 * @param {object} playerSettings an object which must contain various player property: speed.walk, speed.run
 * @param {object} keys an object which keeps track of pressed keys IMPORTANT: keys object must be set in the state
 *
 */

 export const animate = ({
    player,
    playerSettings,
    frameCount = 0,
    keys,
    stage,
    boundaries,
    events,
    walkableTiles,
    movables,
    actions
  }) => {
    //reset player speed on every frame based on shift.pressed value
    let playerSpeed = playerSettings.speed.walk;
  
    if (keys.shift.pressed) {
      playerSpeed = playerSettings.speed.run || 10;
      player.frames.hold = 5;
    }
  
    if (!keys.shift.pressed) {
      playerSpeed = playerSettings.speed.walk;
      player.frames.hold = 7;
      if (!player.moving) player.frames.hold = 27;
    }
  
    //draw map
    stage.stageBackground.draw();
  
    //draw boundaries for collisions
    boundaries.forEach((boundary) => {
      boundary.draw();
    });

    //draw events
    events.forEach((event) => {
      event.draw();
    });
  
    //draw player
    player.draw();
  
    //draw foreground
    stage.stageForeground.draw();
  
    //MOVING player PLAYER

    if (player) {
      //STILL
      if (keys.lastkey == "right") player.image = player.sprites.right;
      else if (keys.lastkey == "left") player.image = player.sprites.left;
      else if (keys.lastkey == "up") player.image = player.sprites.up;
      else if (keys.lastkey == "down") player.image = player.sprites.down;
    }
  
    //Reset obstacle
    player.obstacle = false;
    let obstacle = false;
    player.moving = false;
  
    if (keys.right.pressed && keys.lastkey == "right") {
      player.lastkey = "right";
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
                x: boundary.position.x - playerSpeed,
                y: boundary.position.y,
              },
            },
          })
        ) {
          obstacle = true
          player.obstacle = true;
          console.log('colliding');
          break;
        }
      }

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (
          rectangularCollision({
            sprite1: player,
            sprite2: {
              ...event,
              position: {
                x: event.position.x - playerSpeed,
                y: event.position.y,
              },
            },
          })
        ) {
          event.inRange = true;
          break;
        } else {
          event.inRange = false
        }
      }

      if (!player.obstacle && !obstacle) {
        movables.forEach((movable) => {
          movable.position.x -= playerSpeed;
      })
      }
    } else if (keys.left.pressed && keys.lastkey == "left") {
      player.lastkey = "left";
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
                y: boundary.position.y,
              },
            },
          })
        ) {
          obstacle = true;
          player.obstacle = true;
          console.log('colliding');
          break;
        }
      }

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (
          rectangularCollision({
            sprite1: player,
            sprite2: {
              ...event,
              position: {
                x: event.position.x + playerSpeed,
                y: event.position.y,
              },
            },
          })
        ) {
          event.inRange = true;
          break;
        } else {
          event.inRange = false
        }
      }

      if (!player.obstacle && !obstacle) {
        movables.forEach((movable) => {
          movable.position.x += playerSpeed;
      })
      }
    } else if (keys.up.pressed && keys.lastkey == "up") {
      player.lastkey = "up";
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
              },
            },
          })
        ) {
          obstacle = true;
          player.obstacle = true;
          console.log('colliding');
          break;
        }
      }
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (
          rectangularCollision({
            sprite1: player,
            sprite2: {
              ...event,
              position: {
                x: event.position.x,
                y: event.position.y + playerSpeed,
              },
            },
          })
        ) {
          event.inRange = true;
          break;
        } else {
          event.inRange = false
        }
      }

      if (!player.obstacle && !obstacle) {
        movables.forEach((movable) => {
          movable.position.y += playerSpeed;
      })
      }
    } else if (keys.down.pressed && keys.lastkey == "down") {
      player.lastkey = "down";
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
              },
            },
          })
        ) {
          obstacle = true;
          player.obstacle = true;
          console.log('colliding');
          break;
        }
      }

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (
          rectangularCollision({
            sprite1: player,
            sprite2: {
              ...event,
              position: {
                x: event.position.x,
                y: event.position.y - playerSpeed,
              },
            },
          })
        ) {
          event.inRange = true;
          break;
        } else {
          event.inRange = false
        }
      }

      if (!player.obstacle && !obstacle) {
        movables.forEach((movable)=>{
          movable.position.y -= playerSpeed;
      })
      }
    }
  

    //activate events
    events.forEach(event => {
      if (event.inRange) {
        switch (event.type) {
          case 'battle':
            if(keys.lastkey === 'space') {
              keys.lastkey = '';
              actions.handleBattle();
            }
            break;
        
          default:
            break;
        }
      } 
    })
    frameCount++;
  };