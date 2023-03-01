import logo from '../images/CODERS_extended_logo.svg'

export function StartSection() {
    return (
        <header className="main-header h-screen">
            <div className="start-wrapper">
                <div className="start text-center flex flex-col justify-around rounded-3xl drop-shadow-lg">
                    <div className='logo-container'>
                        {<img src={logo} alt="Logo" />}
                    </div>
                    <div>
                        <a href='./game/game.html'>
                            <button className= "text-6xl p-7 start-button ">Start</button>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}