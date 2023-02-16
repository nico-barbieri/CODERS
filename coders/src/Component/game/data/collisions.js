export async function getCollision(directory) {
    const response = await fetch(directory);
    const data = await response.json();
    const collisionLayer = data.layers.filter((layer) => {
        return layer.name == 'collisions';
    })
    return collisionLayer[0].data;
}