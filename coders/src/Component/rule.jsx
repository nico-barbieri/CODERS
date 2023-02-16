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
                    <p>
                        The game is a TBS(turn based strategy), where your robot fights against a foe's one with brutal attacks!, every turn you can use some enhancements called "CHIP", that allows your robot to perform some special actions, like double damage attacks or status shots! only the toughest will survive!! 
                    </p>
                </div>
            </div>
        </div>
    )
}