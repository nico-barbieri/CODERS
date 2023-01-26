export function Header() {

    return (
        <nav className="header">
            <div className="header-inner container flex items-center justify-around">
                <div className="header-logo ">
                    LOGO
                </div>
                <ul className="header-nav flex items-center justify-around ">
                    <li><a href="#">overview</a></li>
                    <li><a href="#">champions</a></li>
                    <li><a href="#">support</a></li>
                </ul>
            </div>
        </nav>
    )
}