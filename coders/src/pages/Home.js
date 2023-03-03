import { useEffect, useRef } from "react"

import Canvas from "../components/utilities/Canvas"

//SECTIONS
import StartSection from "../components/Section0"
import WhoAreCoders from "../components/Section1"
import ControlsAndRules from "../components/Section2"
import CollectionAndChampions from "../components/Section3"
import useCompareScrollOffset from "../hooks/useCompareScrollOffset"

const Home = ({stopAnimation}) => {
    const Section1 = useRef(null)
    const Section2 = useRef(null)
    const Section3 = useRef(null)

    const [inRange1, visible1] = useCompareScrollOffset(Section1)
    const [inRange2, visible2] = useCompareScrollOffset(Section2)
    const [inRange3, visible3] = useCompareScrollOffset(Section3)

    return <div className="body-wrapper">
        {/* <Canvas /> */}
        <StartSection />
        <WhoAreCoders ref={Section1} inRange={inRange1} titleVisible={visible1} stopAnimation={stopAnimation}/>
        <ControlsAndRules ref={Section2} inRange={inRange2} titleVisible={visible2} stopAnimation={stopAnimation}/>
        <CollectionAndChampions ref={Section3} inRange={inRange3} titleVisible={visible3} stopAnimation={stopAnimation}/>
    </div>
}

export default Home;