import { useEffect, useState } from "react"


const useWeather = () => {
    const [BAWeather, setBAWeather] = useState([])
    const [currentDayBAWeather, setCurrentDayBAWeather] = useState([])

    useEffect(() => {
        setBAWeather(JSON.parse(localStorage.getItem('currentHourBAWeather')))
        console.log("peltudodemierdahijodeptua", JSON.parse(localStorage.getItem('currentDayBAWeather')))
        setCurrentDayBAWeather(JSON.parse(localStorage.getItem('currentDayBAWeather')))
    }, [])

    const directions = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"]

    const getDirection = (angle) => {
        const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        console.log("index", index, directions[index])
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

    return {BAWeather, currentDayBAWeather, getDirection, getWeatherFromDay, activeCurrentHourItem}
}

export default useWeather
