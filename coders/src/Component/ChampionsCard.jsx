import { useEffect } from 'react';
import { useState } from 'react';
import champions from '../champions.json';

export function ChampionsCard() {

    const [sprite, setSprite] = useState(null)
    const [id, setId] = useState(1)

    function randomID() {
        const random = Math.floor(Math.random() * 3);
        setId(random)

        console.log(id)
    }
    useEffect(() => {
        setSprite(champions[id])
    }, [id])








    return (<div>

        <div className='champions-card border-2 border-black w-[50%] '>
            {
                sprite && (
                    <div key={sprite.id}>
                        <div>
                            <h4>{sprite.name}</h4>
                        </div>
                        <div>
                            <img src={sprite.img} alt="immagine sprite" />
                        </div>
                        <div>
                            <p>Speed: {sprite.speed}</p>
                        </div>
                    </div>
                )
            }
        </div>
        <button onClick={() => randomID()} >Get random champion </button>

    </div>
    )
}