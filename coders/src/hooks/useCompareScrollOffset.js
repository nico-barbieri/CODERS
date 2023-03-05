import { useEffect, useState } from "react";
import baffle from "baffle"

const useCompareScrollOffset = (el, oneAtATime = '') => {
    const scrollOffset = 450;
    const visibleTime = 1500;

    const visibleElements = oneAtATime? document.querySelectorAll(oneAtATime + '.show') : 0;
    

    const [prevScrollPos, setPrevScrollPos] = useState(window.screenY +100)
    const [visible, setVisible] = useState(false)

    const delayedSetVisible = (value, delay) => setTimeout(() => {
        setVisible(value);
    }, delay);

    const checkScrollRange = () => {
        
        if (
            prevScrollPos <= el.current.offsetTop - scrollOffset &&
            window.scrollY >= el.current.offsetTop - scrollOffset
            ) {
            const b = baffle(document.querySelectorAll('.baffle'), {
                speed: 50,
            });
            if (visibleElements.length === 0){
                el.current.children[0].style.animationDuration = '.3s';
                setVisible(true);
                b.text(() => el.current.dataset.title)
                b.reveal(1000)
                
                delayedSetVisible(false, visibleTime)

            } else {
                visibleElements.forEach((visibleElement)=> {
                    visibleElement.classList.remove('show')
                    visibleElement.classList.remove('hide')
                    visibleElement.style.animationDuration = '0s';
                })
                el.current.children[0].style.animationDuration = '.3s';

                setVisible(true);
                b.text(() => el.current.dataset.title)
                b.reveal(1000)

                delayedSetVisible(false, visibleTime)
            }
        } 

        if (window.scrollY >= el.current.offsetTop - scrollOffset &&
            window.scrollY <= el.current.offsetTop + el.current.offsetHeight - scrollOffset
            ) {
            document.body.style.background = el.current.dataset.background
        } 

        setPrevScrollPos(window.scrollY)
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', checkScrollRange);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', checkScrollRange);
            };
        }
    }, [window.scrollY]);

    return [visible]
}

export default useCompareScrollOffset;