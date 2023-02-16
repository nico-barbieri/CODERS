import { faFacebook, faInstagram, faTwitter, faGithub, faYoutube, faDiscord, faReddit, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Footer() {
    return (
        <div className="footer" >
            <div className="footer-wrapper drop-shadow-lg">
                <div className="social-link-container">
                    <a href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faInstagram} />
                    </a>
                    <a href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faTiktok} />
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faTwitter} />
                    </a>
                    <a href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faYoutube} />
                    </a>
                    <a href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faDiscord} />
                    </a>
                    <a href='#'>
                    <FontAwesomeIcon className="social-icon" icon={faReddit} />
                    </a>
                    <a href='#'>
                        <FontAwesomeIcon className="social-icon" icon={faGithub} />
                    </a>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-container">
                        <h3>about</h3>
                        <ul>
                            <a href="#"><li>Contact</li></a>
                            <a href="#"><li>Community</li></a>
                            <a href="#"><li>News</li></a>
                            <a href="#"><li>NFTs & more</li></a>
                        </ul>
                    </div>
                    <div className="footer-link-container">
                        <h3>help</h3>
                        <ul>
                            <a href="#"><li>FAQ</li></a>
                            <a href="#"><li>Guides</li></a>
                            <a href="#"><li>Customer Support</li></a>
                            <a href="#"><li>Troubleshooting</li></a>
                        </ul>
                    </div>

                    <div className='footer-link-container'>
                        <h3>developers</h3>
                        <ul>
                            <a href="#"><li>The Team</li></a>
                            <a href="#"><li>Documentation</li></a>
                            <a href="#"><li>Github</li></a>
                            <a href="#"><li>Have a suggestion?</li></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}