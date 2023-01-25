export function MainHeader() {
    return (
        <header className="main-header">
            <div className="start-wrapper">
                <div className="start text-center flex flex-col justify-around rounded-3xl">
                    <div>
                        <h1 className="text-7xl text-black">CODERS</h1>
                    </div>
                    <div>
                        <button className= "text-6xl p-2 bg-green-500 hover:bg-green-600 ">Start</button>
                    </div>
                </div>
            </div>
        </header>
    )
}