import { useState } from "react"

const useSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    const switchSidebar = () => {
        if(showSidebar) setShowSidebar(false)
        else setShowSidebar(true)
    }

    return {showSidebar, switchSidebar}
}

export default useSidebar
