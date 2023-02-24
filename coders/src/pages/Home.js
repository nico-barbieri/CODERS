import { Canva } from "../Component/Canva"
import { LastSection } from "../Component/LastSection"
import { Presentation } from "../Component/Presentation"
import { Rule } from "../Component/rule"
import { StartSection } from "../Component/StartSection"
import ToTop from "../Component/ToTop"

const Home = () => {
    return <div className="body-wrapper">
        {/* <Canva /> */}
        <StartSection  />
        <Presentation />
        <Rule />
        <LastSection />
    </div>
}

export default Home