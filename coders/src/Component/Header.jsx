import {ReactComponent as ShortLogo} from '../images/coders_logo_short_nobkg.svg'
import {ReactComponent as LogoTitle} from '../images/CODERS_extended_logo-nosub.svg'

export function Header() {
    const nav = document.getElementById('navbar');


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos >= currentScrollPos) {
        nav.style.top = "0";
    }
    else {
        nav.style.top = "-95px";
    }
    prevScrollpos = currentScrollPos;
}




    return (
        <nav className="header" id='navbar'>
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
                    <li><a href="#">overview</a></li>
                    <li><a href="#champions">champions</a></li>
                    <li><a href="#">support</a></li>
                </ul>
            </div>
        </nav>
    )
}