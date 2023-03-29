import React from "react";
import GameView from "./GameView"

//import all images

import background from './data/res/img/maps/page_bkg.png';
import foreground from './data/res/img/maps/page_bkg_foreground_REFINED.png';
import still_up from './data/res/img/sprites/player_0_up.png';
import still_down from './data/res/img/sprites/player_0_down.png';
import still_right from './data/res/img/sprites/player_0_right.png';
import still_left from './data/res/img/sprites/player_0_left.png';
import walk_up from './data/res/img/sprites/player_0_walk_up.png';
import walk_down from './data/res/img/sprites/player_0_walk_down.png';
import walk_right from './data/res/img/sprites/player_0_walk_right.png';
import walk_left from './data/res/img/sprites/player_0_walk_left.png';

//import collisions
import collisions from './data/page_bkg_collisions.json'


const GameBG = ({numberOfSections=1, bg}) => {

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
        numberOfSections: numberOfSections, 
    }
    return <>
        <GameView settings={settings} /* ref={canvasRef} */
        />
    </>
}

export default React.memo(GameBG);