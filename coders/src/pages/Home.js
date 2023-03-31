import { useContext, useEffect, useRef } from "react"
import { GameContext } from "../components/game/utilities/GameContext"
import useCompareScrollOffset from "../hooks/useCompareScrollOffset"
import { isObjectIncluded } from "../components/utilities"

//SECTIONS
import StartSection from "../components/Section0"
import WhoAreCoders from "../components/Section1"
import ControlsAndRules from "../components/Section2"
import CollectionAndChampions from "../components/Section3"
import Game from "./Game"

//import all images

import background from '../components/game/data/res/img/maps/page_bkg.png';
import foreground from '../components/game/data/res/img/maps/page_bkg_foreground_REFINED.png';
import still_up from '../components/game/data/res/img/sprites/player_0_up.png';
import still_down from '../components/game/data/res/img/sprites/player_0_down.png';
import still_right from '../components/game/data/res/img/sprites/player_0_right.png';
import still_left from '../components/game/data/res/img/sprites/player_0_left.png';
import walk_up from '../components/game/data/res/img/sprites/player_0_walk_up.png';
import walk_down from '../components/game/data/res/img/sprites/player_0_walk_down.png';
import walk_right from '../components/game/data/res/img/sprites/player_0_walk_right.png';
import walk_left from '../components/game/data/res/img/sprites/player_0_walk_left.png';

//import collisions
import collisions from '../components/game/data/page_bkg_collisions.json'

const Home = ({stopAnimation}) => {

    const Section0 = useRef(null)
    const Section1 = useRef(null)
    const Section2 = useRef(null)
    const Section3 = useRef(null)

    const [visible0] = useCompareScrollOffset(Section0)
    const [visible1] = useCompareScrollOffset(Section1, '.section-title')
    const [visible2] = useCompareScrollOffset(Section2, '.section-title')
    const [visible3] = useCompareScrollOffset(Section3, '.section-title')

    const { context, setContext } = useContext(GameContext)

    const numberOfSections = 4.5;
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
        proportions: 48 / (28 * numberOfSections),
        isLoading: false,
        gameSettings: {
            mapDimensions: {
                x: window.innerWidth,
                y: window.innerHeight * numberOfSections,
              },
            offset: {
                x: /* view.canvas.width */ window.innerWidth / 2 - (window.innerHeight * 48) / 28 / 2,
                y: 0,
              },
        },
    }

    useEffect(() => {
        if (!context || !isObjectIncluded(settings, context)) {
            console.log('setting home background...');
            setContext(context => ({
                ...context,
                ...settings,
            }))
        }
    }, [])

    return <>
        {context && <Game isBackground={true}/>}
        <StartSection ref={Section0} titleVisible={visible0} stopAnimation={stopAnimation}/>
        <WhoAreCoders ref={Section1} titleVisible={visible1} stopAnimation={stopAnimation}/>
        <ControlsAndRules ref={Section2} titleVisible={visible2} stopAnimation={stopAnimation}/>
        <CollectionAndChampions ref={Section3} titleVisible={visible3} stopAnimation={stopAnimation}/>
    </>
}

export default Home;
