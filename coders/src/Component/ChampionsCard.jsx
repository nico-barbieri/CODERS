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








    return (
    <div className=' ml-8 w-[50%]'>
        <div className='champions-card border-2 border-black mb-2  '>
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
        <div>
            <button className='border-2 p-2 border-black random-button-card' onClick={() => randomID()} >Show random champion </button>
        </div>
    </div>
    )
}