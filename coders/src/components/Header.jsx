import React, { memo } from 'react'

import {ReactComponent as ShortLogo} from '../images/coders_logo_short_nobkg.svg'
import {ReactComponent as LogoTitle} from '../images/CODERS_extended_logo-nosub.svg'
import { PowerGlitch } from 'powerglitch';
import { Link } from 'react-router-dom';

function Header({show, handleClick}) {

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
        <nav className={'header ' + (show? 'show' : 'hide')}  id='navbar'>
            <div className="header-inner flex items-center justify-between">
                <Link to={'/'}>
                  <div className="header-logo-container">
                      <div className='header-logo'>
                          <ShortLogo />
                      </div>
                      <div className='header-logo'>
                          <LogoTitle />
                      </div>
                  </div>
                </Link>
                <ul className="header-nav flex items-center justify-around ">
                    <li onMouseEnter={handleHover}><a href="/#who-are-coders" onClick={handleClick} >Who are<br/>Coders?</a></li>
                    <li onMouseEnter={handleHover}><a href="/#rule" onClick={handleClick} >Controls<br/>& Rules</a></li>
                    <li onMouseEnter={handleHover}><a href="/#board" onClick={handleClick} >Collection<br/>& Champions</a></li>
                    <li onMouseEnter={handleHover}>
                        <Link to={'/login'}>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default React.memo(Header);
