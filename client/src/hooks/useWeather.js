import { useEffect, useState } from "react"


const useWeather = () => {
    const [weather, setWeather] = useState([])
    const [weatherResults, setWeatherResults] = useState([])
    const [currentHourBAWeather, setCurrentHourBAWeather] = useState([])
    const [currentDayBAWeather, setCurrentDayBAWeather] = useState([])
    const [searchWeather, setSearchWeather] = useState()

    useEffect(() => {
        setCurrentHourBAWeather(JSON.parse(localStorage.getItem('currentHourBAWeather')))
        setCurrentDayBAWeather(JSON.parse(localStorage.getItem('currentDayBAWeather')))
        setWeather(JSON.parse(localStorage.getItem('weather')))
    }, [])

    useEffect(() => {
        // if(searchWeather === '') setLoader(false)
        if(searchWeather) {
            // setLoader(true)
            const timer = setTimeout(() => {
                if(searchWeather !== undefined){
                    console.log("putito", weather)
                    // setLoader(false)
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchWeather])

    const directions = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"]

    const getDirection = (angle) => {
        const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index]
    }

    const getWeatherFromDay = (weather) => {
        const BAWeather = JSON.parse(localStorage.getItem('BAWeather'))
        const weatherFromDay = BAWeather.filter((item) => {
            return item.date.split('/')[0] === weather.date.split('/')[0]
        })
        setCurrentDayBAWeather(weatherFromDay) 
    }

    const activeCurrentHourItem = (item) => {
        const currentHour = new Date().getHours()
        const itemHour = item.hour.replace('Hs','')
        if(itemHour > (currentHour - 2) && itemHour < (currentHour + 2)) return "list__item active"
        else return "list__item"
    }

    const celsiusToFahrenheit = (degrees) => {
        return Math.round((Math.round(degrees) * (9 / 5)) + 32)
    }

    return {currentHourBAWeather, currentDayBAWeather, getDirection, getWeatherFromDay, activeCurrentHourItem, celsiusToFahrenheit, setSearchWeather, weatherResults}
}

export default useWeather
