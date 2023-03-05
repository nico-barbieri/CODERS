import React from "react";
import { Champions } from "./utilities/Champions"
import { Classification } from "./utilities/Classification"

function CollectionAndChampions(props, ref) {
        return (
            <div id="board" ref={ref} data-background='hsl(240, 13%, 19%)'
            data-title='COLLECTION & CHAMPIONS' className="board-section h-screen relative fullscreen-section">
                <div className={"section-title " + (props.titleVisible  && !props.stopAnimation ? 'show' : 'hide')}>
                    <h3>
                        <span className="animated-title baffle">COLLECTION &</span> 
                    </h3>
                </div>
                <div className="board-section-container flex text-center justify-around ">
                <Classification />
                <Champions />
                </div>
            </div>
        )
}

export default React.forwardRef(CollectionAndChampions);