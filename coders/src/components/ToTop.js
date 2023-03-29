import React, { memo } from 'react';
import {ReactComponent as ArrowUp} from '../images/arrow_up.svg'


const ToTop = ({top}) => {

    /* const [state, setState] = useState({
        visible: true,
    })
    
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

*/
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    } 
 return <>
    <div className="to-top">
        <button className= {"start-button " + (top? 'hide' : 'show')} onClick={handleClick}>
        <ArrowUp />
        </button>
    </div>
 </>
}

export default React.memo(ToTop);
