import { useEffect } from "react"

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        let listener = event => {
            // do nothing if clicking ref is elemnt or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }

            // otherwise pass it along, to close off that div reference
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        // console.log(ref, "??")

        return () => {
            document.removeEventListener('mousedown', listener)
        }

    }, [ref, handler])
}