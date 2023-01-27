import logo from '../images/CODERS_extended_logo.svg'

export function MainHeader() {
    return (
        <header className="main-header">
            <div className="start-wrapper">
                <div className="start text-center flex flex-col justify-around rounded-3xl drop-shadow-lg">
                    <div className='logo-container'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div>
                        <button className= "text-6xl p-7 ">Start</button>
                    </div>
                </div>
            </div>
        </header>
    )
}