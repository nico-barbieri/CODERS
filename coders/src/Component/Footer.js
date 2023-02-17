import { faFacebook, faInstagram, faTwitter, faGithub, faYoutube, faDiscord, faReddit, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PowerGlitch } from 'powerglitch';


export default function Footer() {


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
              "velocity": 18,
              "minHeight": 0.09,
              "maxHeight": 0.15,
              "hueRotate": true
            },
            "pulse": false
          })
     }

    return (
        <div className="footer" >
            <div className="footer-wrapper drop-shadow-lg">
                <div className="social-link-container">
                    <a onMouseEnter={handleHover} href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faInstagram} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faTiktok} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faTwitter} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faYoutube} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faDiscord} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faReddit} />
                    </a>
                    <a onMouseEnter={handleHover} href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faGithub} />
                    </a>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-container">
                        <h3>about</h3>
                        <ul>
                            <a onMouseEnter={handleHover} href="#"><li>Contact</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Community</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>News</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>NFTs & more</li></a>
                        </ul>
                    </div>
                    <div className="footer-link-container">
                        <h3>help</h3>
                        <ul>
                            <a onMouseEnter={handleHover} href="#"><li>FAQ</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Guides</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Customer Support</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Troubleshooting</li></a>
                        </ul>
                    </div>

                    <div className='footer-link-container'>
                        <h3>developers</h3>
                        <ul>
                            <a onMouseEnter={handleHover} href="#"><li>The Team</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Documentation</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Github</li></a>
                            <a onMouseEnter={handleHover} href="#"><li>Have a suggestion?</li></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}