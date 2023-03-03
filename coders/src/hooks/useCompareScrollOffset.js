import { useEffect, useState } from "react";

const useCompareScrollOffset = (el) => {
    const [inRange, setInRange] = useState(true)
    const [visible, setVisible] = useState(false)

    const checkScrollRange = () => {
        if (
            window.scrollY >= el.current.offsetTop - 550 && 
            window.scrollY <= el.current.offsetTop + 150
            ) {
            setInRange(true);

            if (
                window.scrollY >= el.current.offsetTop - 350 && 
                window.scrollY <= el.current.offsetTop - 0
                ) {
                setVisible(true);
            } else {
                setVisible(false);
            }

        } else {
            setInRange(false);
        }
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

    return [inRange, visible]
}

export default useCompareScrollOffset;