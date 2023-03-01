import /* React, */ { useRef, useEffect } from 'react'

import { getCollision } from './game/data/collisions';
import { Stage, Background, Sprite, Boundary } from './game/utilities/gameClasses'
import { keys, setPressed, unsetPressed } from './game/utilities/keys'

const Canvas = props => {

    const canvasRef = useRef(null);
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {

        let frameCount = 0;
        let animationFrameId;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        //create images
        let mapBackground = new Image();
        mapBackground.src = '../../res/img/maps/page_bkg.png';

        let mapForeground = new Image();
        mapForeground.src = '../../res/img/maps/page_bkg_foreground_REFINED.png';

        let playerUp = new Image();
        playerUp.src = '../../res/img/sprites/player_0_up.png';
        let playerWalkingUp = new Image();
        playerWalkingUp.src = '../../res/img/sprites/player_0_walk_up.png';

        let playerDown = new Image();
        playerDown.src = '../../res/img/sprites/player_0_down.png';
        let playerWalkingDown = new Image();
        playerWalkingDown.src = '../../res/img/sprites/player_0_walk_down.png';

        let playerRight = new Image();
        playerRight.src = '../../res/img/sprites/player_0_right.png';
        let playerWalkingRight = new Image();
        playerWalkingRight.src = '../../res/img/sprites/player_0_walk_right.png';

        let playerLeft = new Image();
        playerLeft.src = '../../res/img/sprites/player_0_left.png';
        let playerWalkingLeft = new Image();
        playerWalkingLeft.src = '../../res/img/sprites/player_0_walk_left.png';

        let playerShadow = new Image();
        playerShadow.src = '../../res/img/sprites/shadow.png';


        //variables initialization
        let scaleRatio = .5
        const globalScale = 4; //scale of pixel art (400%)
        const numberOfSections = 3;
        let lastkey = 'down'; // the game starts with the frontal view of the player

        //player normal speed
        let playerSpeed = 5
        mapBackground.onload = () => {
            scaleRatio = document.body.scrollHeight / gameMap.height;
            /* setBoundaries();
            animate(); */
        };

        //create stage
        let page_bkg = new Stage({
            canvas: canvas,
            proportions: 48 / (28 * numberOfSections),
        });

        /*COLLISIONS*/
        const collisions = getCollision;
        

        console.log(collisions);

        //init stage
        page_bkg.fullscreen();
        page_bkg.init();
        //Our draw came here
        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas