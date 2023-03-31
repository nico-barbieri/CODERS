//UTILITIES
//function to detect collisions
export function rectangularCollision({ sprite1, sprite2 }) {
  return (
    sprite1.position.x + sprite1.width > sprite2.position.x &&
    sprite1.position.x < sprite2.position.x + sprite2.width &&
    sprite1.position.y + sprite1.height > sprite2.position.y &&
    sprite1.position.y + sprite1.height / 1.6 <
      sprite2.position.y + sprite2.height
  );
}

//function to pick a random element from an array
export const randomPick = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//function to retrieve collision from json file
export const getCollision = (data, layerName = "collisions") => {
  const collisionLayer = data.layers.filter((layer) => {
    return layer.name == layerName;
  });
  return collisionLayer[0].data;
};

export const detectCollision = (tiles, player, playerSpeed, direction) => {
  let speedCompensation = {
    x: 0,
    y: 0,
  };
  switch (direction) {
    case 'right':
      speedCompensation.x = -playerSpeed
      break;
    case 'left':
      speedCompensation.x = playerSpeed
      break;
    case 'up':
      speedCompensation.y = playerSpeed
      break;
    case 'down':
      speedCompensation.y = -playerSpeed
      break;
  
    default:
      break;
  }
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (
      rectangularCollision({
        sprite1: player,
        sprite2: {
          ...tile,
          position: {
            x: tile.position.x + speedCompensation.x,
            y: tile.position.y + speedCompensation.y,
          },
        },
      })
    ) {
      console.log('event');
      return true
    } else {
      console.log('no event');

      return false
    }
  }
}

