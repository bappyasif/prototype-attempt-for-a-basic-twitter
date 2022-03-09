import React, { useEffect } from 'react'

function useOnHoverOutside(ref, handler) {
    useEffect(() => {
        let listener = event => {
            // do nothing if hover ref is elemnt or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }

            // otherwise pass it along, to close off that div reference
            handler(event)
        }

        document.addEventListener('mouseleave', listener)

        return () => {
            document.removeEventListener('mouseleave', listener)
        }

    }, [ref, handler])
}

export default useOnHoverOutside
