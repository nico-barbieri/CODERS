import {ReactComponent as ShortLogo} from '../images/coders_logo_short_nobkg.svg'
import {ReactComponent as LogoTitle} from '../images/CODERS_extended_logo-nosub.svg'
import { PowerGlitch } from 'powerglitch';
import { useState } from 'react';

export function Header() {
const [state, setState] = useState({
    visible: true,
})

    const nav = document.getElementById('navbar');

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 150) {

        if (prevScrollpos >= currentScrollPos) {
            setState({
                visible: true,
            })
        }
        else {
            setState({
                visible: false,
            })
        } 
    }
    prevScrollpos = currentScrollPos;
}

 const handleHover = (e) => {
    PowerGlitch.glitch(e.target, {
        "playMode": "hover",
        "createContainers": true,
        "hideOverflow": false,
        "timing": {
          "duration": 300,
          "iterations": 1,
          "easing": "ease-out"
        },
        "glitchTimeSpan": {
          "start": 0,
          "end": 1
        },
        "shake": {
          "velocity": 15,
          "amplitudeX": 0.1,
          "amplitudeY": 0.2
        },
        "slice": {
          "count": 6,
          "velocity": 25,
          "minHeight": 0.04,
          "maxHeight": 0.15,
          "hueRotate": true
        },
        "pulse": false
      })
 }


    return (
        <nav className={'header ' + (state.visible? 'show' : 'hide')}  id='navbar'>
            <div className="header-inner flex items-center justify-between">
                <div className="header-logo-container">
                    <div className='header-logo'>
                        <ShortLogo />
                    </div>
                    <div className='header-logo'>
                        <LogoTitle />
                    </div>
                </div>
                <ul className="header-nav flex items-center justify-around ">
                    <li onMouseEnter={handleHover}><a href="#">overview</a></li>
                    <li onMouseEnter={handleHover}><a href="#champions">champions</a></li>
                    <li onMouseEnter={handleHover}><a href="#">support</a></li>
                </ul>
            </div>
        </nav>
    )
}