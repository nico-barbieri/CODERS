export function Rule() {
    return (
        <div className=' rule-section h-screen relative text-center'>
            <div className="rule-title absolute-traslate ">
                <div>
                    <h2>Rules and<br/>Controls</h2>
                </div>
            </div>
            <div className="rule-content flex flex-col gap-10  absolute-traslate">
                <div className="controls ">
                    <p>Move player pressing WASD or arrows on your keyboard. 
                        <br/>Press Shift to move faster.
                        <br/>Press SPACE to interact with objects and characters.
                    </p>
                </div>
                <div className="rules">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et repellat sunt dolorum, saepe possimus sequi quia aspernatur doloremque nemo explicabo rem libero illo? Ut numquam amet tempore quia, cupiditate sunt!</p>
                </div>
            </div>
        </div>
    )
}