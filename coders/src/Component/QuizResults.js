import React from "react"
import questions from "./QuizData"
export const QuizResult = (props) => {
    return(
        <div className="score-section">
            <h2>Completed!</h2>
            <h4>Total Score {props.score}/60</h4>
            <h4>Your Correct Question {props.CorrectAns} out of {questions.length}</h4>
            <button onClick={props.handlePlayAgain}>Play Again</button>
        </div>
    )
}
