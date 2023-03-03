import React from "react";

function WhoAreCoders(props, ref) {
    return (
        <div id="who-are-coders" ref={ref} className={'rule-section h-screen relative text-center '}>
            {(props.inRange ) && <div className={"section-title " + (props.titleVisible && !props.stopAnimation? 'show' : 'hide')}><h3>WHO ARE<br/>CODERS?</h3></div>}
            <div className="rule-content   absolute-traslate">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam et pariatur necessitatibus, praesentium ipsa voluptatem error ea aperiam debitis at adipisci eum expedita facilis quod suscipit ipsum perferendis magni eos minima rerum qui blanditiis exercitationem totam? Voluptates voluptatum architecto, harum blanditiis facere ipsa quo delectus, necessitatibus et, tempore sit alias?</p>
            </div>
        </div>
    )
}

export default React.forwardRef(WhoAreCoders);