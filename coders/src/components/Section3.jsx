import React from "react";
import { Champions } from "./utilities/Champions"
import { Classification } from "./utilities/Classification"

function CollectionAndChampions(props, ref) {
        return (
            <div id="board" ref={ref} className="board-section h-screen relative fullscreen-section">
                {(props.inRange) && <div className={"section-title " + (props.titleVisible  && !props.stopAnimation ? 'show' : 'hide')}><h3>COLLECTION &<br/>CHAMPIONS</h3></div>}
                <div className="board-section-container flex text-center justify-around ">
                <Classification />
                <Champions />
                </div>
            </div>
        )
}

export default React.forwardRef(CollectionAndChampions);