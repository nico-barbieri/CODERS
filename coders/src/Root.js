import { BrowserRouter } from 'react-router-dom'
import App from './App'

export function Root() {

    /* document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }); */

    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}