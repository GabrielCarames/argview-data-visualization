import { useEffect, useState } from "react"


const useWeather = () => {
    const [BAWeather, setBAWeather] = useState([])

    useEffect(() => {
        setBAWeather(JSON.parse(localStorage.getItem('BAWeather')))
        
    }, [])

    return {BAWeather}
}

export default useWeather
