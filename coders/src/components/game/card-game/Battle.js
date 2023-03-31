import Game from "./components/Game";
import './index.css';

function Battle({onEnd}) {
  return (<>
    <Game onEnd={onEnd}/>
  </>);
}

export default Battle;
