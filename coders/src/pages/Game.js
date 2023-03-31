import GameView from "../components/game/GameView";
import GameViewBackground from "../components/game/GameViewBackground";

const Game = ({isBackground = false}) =>{
    if (isBackground) {
        return <>
        <GameViewBackground />
        </>
    } else {
        return <>
        <GameView />
        </>
    }
}

export default Game;