import React from "react";

function WhoAreCoders(props, ref) {
    return (
        <div id="who-are-coders" ref={ref} data-background='hsl(39, 56%, 59%)'
        data-title='WHO ARE CODERS?' className={'rule-section h-screen relative text-center '}>
            <div className={"section-title " + (props.titleVisible && !props.stopAnimation? 'show' : 'hide')}>
                <h3>
                    <span className="animated-title baffle">WHO ARE</span> 
                </h3>
            </div>
            <div className="rule-content   absolute-traslate">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam et pariatur necessitatibus, praesentium ipsa voluptatem error ea aperiam debitis at adipisci eum expedita facilis quod suscipit ipsum perferendis magni eos minima rerum qui blanditiis exercitationem totam? Voluptates voluptatum architecto, harum blanditiis facere ipsa quo delectus, necessitatibus et, tempore sit alias?</p>
            </div>
        </div>
    )
}

export default React.forwardRef(WhoAreCoders);