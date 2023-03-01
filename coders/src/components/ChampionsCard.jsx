import { useEffect } from 'react';
import { useState } from 'react';
import champions from '../champions.json';

export function ChampionsCard() {

    const [sprite, setSprite] = useState(null)
    const [index, setIndex] = useState(1)

    function randomID() {
        const random = Math.floor(Math.random() * 3);
        setIndex(random)

        //console.log(id)
    }
    useEffect(() => {
        console.log(sprite);
        setSprite(champions[index])
    }, [index])








    return (
    <div className='w-[fit-content]'>
        <div className='champions-card border-2 border-black mb-2 mx'>
            {
                sprite && (
                    <div key={sprite.id}>
                        <div>
                            <h4>{sprite.name}</h4>
                        </div>
                        <div className='sprite-wrapper'>
                            <img src={sprite.img} alt="immagine sprite" className='sprite-img' />
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