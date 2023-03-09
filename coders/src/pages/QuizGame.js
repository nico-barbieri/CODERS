import React from "react";
import {Quiz} from "../components/game/quiz-game/Quiz"
import "../components/game/quiz-game/Quiz.css"
export class QuizGame extends React.Component{
  render(){
    return(
      <div>
        <Quiz/>
      </div>
    )
  }
}