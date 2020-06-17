import { useState, useEffect } from 'react';

export const useHover = (ref: React.RefObject<HTMLElement>) => {
    const [hover, setHover] = useState(false);
    
    const handleMouseOver = () => {
        setHover(true)
    }

    const handleMouseLeave = () => {
        setHover(false)
    }

    useEffect(() => {

        if (!ref) {
            return
        }

        ref.current.addEventListener('mouseover', handleMouseOver)
        ref.current.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            ref.current.addEventListener('mouseover', handleMouseOver)
            ref.current.addEventListener('mouseleave', handleMouseLeave)
        };
    }, [ref])

    return hover
}
