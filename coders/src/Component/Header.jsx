import {ReactComponent as ShortLogo} from '../images/coders_logo_short_nobkg.svg'
import {ReactComponent as LogoTitle} from '../images/CODERS_extended_logo-nosub.svg'

export function Header() {

    return (
        <nav className="header">
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