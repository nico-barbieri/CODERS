import React from "react";
import {Quiz} from "../components/game/quiz-game/Quiz"
import "../components/game/quiz-game/Quiz.css"
import FullscreenSection from "../components/FullscreenSection"
export class QuizGame extends React.Component{
  render(){
    return(
      <div>
        <Quiz/>
        <FullscreenSection />
        <FullscreenSection />
        <FullscreenSection />
      </div>
    )
  }
}