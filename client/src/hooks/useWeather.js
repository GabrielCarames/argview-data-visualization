import { useEffect, useState } from "react"
import useLocationWeather from "./useLocationWeather"

const useWeather = () => {
    const [weather, setWeather] = useState([])
    const [weatherResults, setWeatherResults] = useState([])
    const [currentHourBAWeather, setCurrentHourBAWeather] = useState([])
    const [currentDayBAWeather, setCurrentDayBAWeather] = useState([])
    const [searchWeather, setSearchWeather] = useState()
    const [showWeatherList, setShowWeatherList] = useState(false)
    const {currentDayLocationsFilter, currentHourLocationsFilter} = useLocationWeather()
    const currentHourAndDayWeather = currentHourLocationsFilter(currentDayLocationsFilter(weather))

    useEffect(() => {
        setCurrentHourBAWeather(JSON.parse(localStorage.getItem('currentHourBAWeather')))
        setCurrentDayBAWeather(JSON.parse(localStorage.getItem('currentDayBAWeather')))
        setWeather(JSON.parse(localStorage.getItem('weather')))
    }, [])

    useEffect(() => {
        if(searchWeather && searchWeather !== undefined && !/^ *$/.test(searchWeather)) {
            const timer = setTimeout(() => {
                let results = []
                currentDayLocationsFilter(currentHourAndDayWeather).forEach((item) => {
                    if(item.station_name.toLowerCase().replace('_',' ').indexOf(searchWeather.toLowerCase()) >= 0) {
                        results.push(item)
                    }
                })
                if(results.length === 0) results.push("No se encontraron resultados")
                setShowWeatherList(true)
                setWeatherResults(results)
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchWeather])

    const getWeatherFromLocation = (location) => {
        const weatherFromLocation = weather.filter((item) => { return item.station_name === location })
        const currentHourWeatherLocation = currentHourLocationsFilter(weatherFromLocation)
        const currentDayWeatherLocation = currentDayLocationsFilter(weatherFromLocation)
        setCurrentHourBAWeather(currentHourWeatherLocation)
        setCurrentDayBAWeather(currentDayWeatherLocation)
    }

    window.onclick = (event) => {
        const weatherList = document.getElementById('weather-list')
        if(showWeatherList && !weatherList.contains(event.target) && event.target.className !== 'list__item' && event.target.className !== 'searcher__input') setShowWeatherList(false)
        if(event.target.className === 'searcher__input') setShowWeatherList(true)
    }

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

    return {currentHourBAWeather, currentDayBAWeather, getDirection, getWeatherFromDay, activeCurrentHourItem, celsiusToFahrenheit, setSearchWeather, weatherResults, getWeatherFromLocation, showWeatherList}
}

export default useWeather
