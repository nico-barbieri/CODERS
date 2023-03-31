import { useContext, useEffect } from 'react'
import { isObjectIncluded } from '../components/utilities'
import Game from './Game'

//import images
import background from '../components/game/data/res/img/maps/stage_0.png';
import foreground from '../components/game/data/res/img/maps/stage_0_foreground_REFINED.png';
import still_up from '../components/game/data/res/img/sprites/player_0_up.png';
import still_down from '../components/game/data/res/img/sprites/player_0_down.png';
import still_right from '../components/game/data/res/img/sprites/player_0_right.png';
import still_left from '../components/game/data/res/img/sprites/player_0_left.png';
import walk_up from '../components/game/data/res/img/sprites/player_0_walk_up.png';
import walk_down from '../components/game/data/res/img/sprites/player_0_walk_down.png';
import walk_right from '../components/game/data/res/img/sprites/player_0_walk_right.png';
import walk_left from '../components/game/data/res/img/sprites/player_0_walk_left.png';

//import collisions
import collisions from '../components/game/data/stage_0_collisions.json'
import { GameContext } from '../components/game/utilities/GameContext';

const StartGame = () => {

    const { context, setContext } = useContext(GameContext)

    const numberOfSections = 1;
    const settings = {
        imagesSources:{
            map: {
                background: background,
                foreground: foreground,
            }, 
            defaultPlayer: {
                still: {
                    up: still_up,
                    down: still_down,
                    right: still_right,
                    left: still_left,
                },
                walk: {
                    up: walk_up,
                    down: walk_down,
                    right: walk_right,
                    left: walk_left,
                },
            },
        }, 
        collisionsSources: {
            obstacles: collisions,
            events: '',
        },
        numberOfSections, 
        scaleRatio: null,
        proportions: 1,
        isLoading: false,
        gameSettings: {
            mapDimensions: {
                x: 5760,
                y: 5760,
              },
            //offset of the map
            offset: {
                x: -620,
                y: -3700,
            }
        }
    }

    useEffect(() => {
        if (!context || !isObjectIncluded(settings, context)) {
            console.log('Setting game...');
            setContext(context => ({
                ...context,
                ...settings,
            }))
        }
    }, [])

  return (<>
    {context && <Game />}
    </>
  )
}

export default StartGame