import { Canva } from "../components/Canva"
import { LastSection } from "../components/LastSection"
import { Presentation } from "../components/Presentation"
import { Rule } from "../components/rule"
import { StartSection } from "../components/StartSection"
import ToTop from "../components/ToTop"

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