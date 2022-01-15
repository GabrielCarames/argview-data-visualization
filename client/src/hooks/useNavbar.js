import { useState } from "react"

const useNavbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const switchNavbar = () => {
        if(showNavbar) setShowNavbar(false)
        else setShowNavbar(true)
    }

    window.onclick = (event) => {
        const navbar = document.getElementById('navbar')
        if(showNavbar && !navbar.contains(event.target) && event.target.className !== 'header' && event.target.className !== 'content') setShowNavbar(false)
    }

    return {showNavbar, switchNavbar}
}

export default useNavbar
