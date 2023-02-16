import { faFacebook, faInstagram, faTwitter, faGithub} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export default function Footer() {
    return (
        <div className="footer" >
            <div>
            <a href="https://facebook.com">
             <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href='https://instragram.com' >
                <FontAwesomeIcon icon={faInstagram}/>
            </a>
            <a href='https:/twitter.com' >
                <FontAwesomeIcon icon={faTwitter}/>
            </a>
            <a href='https://github.com' >
                <FontAwesomeIcon icon={faGithub}/>
            </a>
        </div>
        <div id='info'>
    <div id='description'>
        <h3>Descrizione</h3>
 <p>hbdfjdnfjsn</p>
    </div>
    <div id="about">
       <ul>
        <li>About</li>
        <li>Contact</li>
        <li>Community</li>
       </ul>
    </div>
    <div id="help">
        <ul>
            <li>Customer Support</li>
            <li>Guides</li>
            <li>Rules</li>
        </ul>
    </div>

    <div id='developers'>
        <ul>
            <li>Developers</li>
            <li>Documentation</li>
            <li>Github</li>
        </ul>

    </div>

    </div>
  </div>
    )
}