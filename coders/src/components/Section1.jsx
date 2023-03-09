import React, { useState } from "react";

function WhoAreCoders(props, ref) {

    const [state, setState] = useState({
        i: 1,
    })

    const content = [
        {
            id: 1,
            title: 'THE BEGINNING',
            text: <p style={{textAlign: 'start'}}>Long time ago, inside the CODERS Corporation S.p.A, a great mad scientist decided to create an army of dangerous androis called CODERS!! </p>,
        },
        {
            id: 2,
            title: 'THE GREATEST CODING WAR EVER MADE',
            text: <p>One day, during a machine revolt, the CODERS conquered the building thanks to their unbelievable cybernmetic powers called CHIPz, the roboctic-developers era had begun!!</p>,
        },
        {
            id: 3,
            title: 'THE CHOSEN ONE',
            text: <p>you are the first prototype of CODERS ever created, a really really cheap and basic model, you dunno even how you survived the war, it's time for you to be the greatest of them all, and to become the most powerful android on the planet!!!!</p>,
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