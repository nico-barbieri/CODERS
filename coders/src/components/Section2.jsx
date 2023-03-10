import React, { useState } from "react"
import { PowerGlitch } from 'powerglitch';
import { useEffect } from "react";


function ControlsAndRules(props, ref) {
    const [state, setState] = useState({
        i: 1,
    })
    
    /* const goNext = () => {
        setState(state => {
            return {
                i: (state.i + 1 > 3) ? 1 : state.i + 1
            }
        })
    }

    let autoflow;

    const startGoNext= (func,interval) => {
        func();
        autoflow = setInterval(func, interval);
        return autoflow;
    }

    const restartGoNext = () => {
        clearInterval(autoflow);
        startGoNext(goNext, 4000)
    }

    useEffect(()=>{
        startGoNext(goNext, 4000)
    }, []) */
    
    const content = [
        {
            id: 1,
            title: 'how to play',
            text: <p style={{textAlign: 'start'}}>Move player pressing WASD or arrows on your keyboard.
                <br/>
                <br/>Press Shift to move faster.
                <br/>
                <br/>Press SPACE to interact with objects and characters.</p>,
        },
        {
            id: 2,
            title: 'a tbs game',
            text: <p>The game is a TBS (turn based strategy), where your robot fights against a foe's one with brutal attacks! Every turn you can use some enhancements called "CHIP", that allows your robot to perform some special actions, like double damage attacks or status shots! only the toughest will survive!! </p>,
        },
        {
            id: 3,
            title: 'become invincible!',
            text: <p>Gain points and get stronger collecting special chips and rare characters from the shop</p>,
        },
    ]

    const handleClick = (e) => {  
        const name = e.target.name;
        console.log(state.i);
        /* restartGoNext(); */
        
        setState(state => {
            if (name==='prev') {
                return {
                    i: (state.i-1<1) ? 3 : state.i-1 
                }
            }
            if (name==='next') {
                return {
                    i: (state.i+1>3) ? 1 : state.i+1
                }
            }
        })
    }

    /* const glitch = () => {
        PowerGlitch.glitch('.rule-section', {
            "playMode": "click",
            "createContainers": true,
            "hideOverflow": false,
            "timing": {
              "duration": 300,
              "iterations": 1,
              "easing": "ease-out"
            },
            "glitchTimeSpan": {
              "start": 0,
              "end": 1
            },
            "shake": {
              "velocity": 15,
              "amplitudeX": 0.1,
              "amplitudeY": 0.05
            },
            "slice": {
              "count": Math.random()*8 + 1,
              "velocity": Math.random()*16 + 10,
              "minHeight": 0.04,
              "maxHeight": 0.15,
              "hueRotate": true
            },
            "pulse": false
          })
    } */

    const slides = content.map(rule => {
        return (
            <div className={
                "rule-content flex flex-col gap-10 absolute-traslate " + 
                ((rule.id == state.i)?'show' : 'hide')} key={rule.id}>
                <div className="rule-header flex w-full justify-between">
                    <button name='prev' onClick={handleClick}>&lt;-</button>
                    <h3>{rule.title}</h3>
                    <button name='next' onClick={handleClick}>-&gt;</button>
                </div>
                <div>{rule.text}</div>
            </div>
    )
    })


    return (<>

        <div id="rule" ref={ref} data-background='hsl(344, 67%, 46%)' 
        data-title='CONTROLS & RULES' className="rule-section h-screen relative text-center">
        <div className={"section-title " + (props.titleVisible && !props.stopAnimation? 'show' : 'hide')}>
            <h3>
                <span className="animated-title baffle">CONTROLS &</span>
            </h3>
        </div>
            {slides}
        </div>
        </>
    )
}

export default React.forwardRef(ControlsAndRules);