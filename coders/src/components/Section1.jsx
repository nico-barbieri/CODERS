import React, { useState } from "react";

function WhoAreCoders(props, ref) {

    const [state, setState] = useState({
        i: 1,
    })

    const content = [
        {
            id: 1,
            title: 'parte storia 1',
            text: <p style={{textAlign: 'start'}}>Move player pressing WASD or arrows on your keyboard.
                <br/>
                <br/>Press Shift to move faster.
                <br/>
                <br/>Press SPACE to interact with objects and characters.</p>,
        },
        {
            id: 2,
            title: 'parte storia 2',
            text: <p>The game is a TBS (turn based strategy), where your robot fights against a foe's one with brutal attacks! Every turn you can use some enhancements called "CHIP", that allows your robot to perform some special actions, like double damage attacks or status shots! only the toughest will survive!! </p>,
        },
        {
            id: 3,
            title: 'parte storia 3',
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

    const slides = content.map(page => {
        return (
            <div className={
                "rule-content flex flex-col gap-10 absolute-traslate " + 
                ((page.id == state.i)?'show' : 'hide')} key={page.id}>
                <div className="rule-header flex w-full justify-between">
                    <button name='prev' onClick={handleClick}>&lt;-</button>
                    <h3>{page.title}</h3>
                    <button name='next' onClick={handleClick}>-&gt;</button>
                </div>
                <div>{page.text}</div>
            </div>
    )
    })
    return (
        <div id="who-are-coders" ref={ref} data-background='hsl(39, 56%, 59%)'
        data-title='WHO ARE CODERS?' className={'rule-section h-screen relative text-center '}>
            <div className={"section-title " + (props.titleVisible && !props.stopAnimation? 'show' : 'hide')}>
                <h3>
                    <span className="animated-title baffle">WHO ARE</span> 
                </h3>
            </div>
            <div>
            {slides}
            </div>
        </div>
    )
}

export default React.forwardRef(WhoAreCoders);