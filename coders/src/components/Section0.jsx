import React from 'react';
import logo from '../images/CODERS_extended_logo.svg'

function StartSection(props, ref) {
    return (
        <div ref={ref} data-background='#2a2a37' className="start-section fullscreen-section h-screen">
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
        </div>
    )
}

export default React.forwardRef(StartSection);