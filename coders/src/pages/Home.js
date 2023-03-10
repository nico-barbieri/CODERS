import { useEffect, useRef } from "react"

//SECTIONS
import StartSection from "../components/Section0"
import WhoAreCoders from "../components/Section1"
import ControlsAndRules from "../components/Section2"
import CollectionAndChampions from "../components/Section3"
import useCompareScrollOffset from "../hooks/useCompareScrollOffset"

const Home = ({stopAnimation}) => {
    const Section0 = useRef(null)
    const Section1 = useRef(null)
    const Section2 = useRef(null)
    const Section3 = useRef(null)

    const [visible0] = useCompareScrollOffset(Section0)
    const [visible1] = useCompareScrollOffset(Section1, '.section-title')
    const [visible2] = useCompareScrollOffset(Section2, '.section-title')
    const [visible3] = useCompareScrollOffset(Section3, '.section-title')

    return <div className="body-wrapper">
        {/* <Canvas /> */}
        <StartSection ref={Section0} titleVisible={visible0} stopAnimation={stopAnimation}/>
        <WhoAreCoders ref={Section1} titleVisible={visible1} stopAnimation={stopAnimation}/>
        <ControlsAndRules ref={Section2} titleVisible={visible2} stopAnimation={stopAnimation}/>
        <CollectionAndChampions ref={Section3} titleVisible={visible3} stopAnimation={stopAnimation}/>
    </div>
}

export default Home;