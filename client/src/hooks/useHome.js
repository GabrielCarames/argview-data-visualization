import { useEffect, useState } from "react";
import useLocationWeather from "./useLocationWeather";
import useDefaultWeather from "./useDefaultWeather";

const useHome = () => {
    const [currentHourBAWeather, setCurrentHourBAWeather] = useState([])

    useEffect(() => {
        checkCurrentHour()
        const currentBAWeather = JSON.parse(localStorage.getItem('currentHourBAWeather'))
        const currentHour = localStorage.getItem('currentHour')
        if(!currentBAWeather) askForGeoLocation()
        else if(currentHour < new Date().getHours()) {
            const userPosition = JSON.parse(localStorage.getItem('userLocation'))
            getFiveDaysForecast(userPosition)
        } else setCurrentHourBAWeather(currentBAWeather)
    }, [])

    const formatProvince = (str) => {
        var splitStr = str.replaceAll("_", " ").toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const askForGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const coords = {coords: {latitude: position.coords.latitude, longitude: position.coords.longitude}}
            localStorage.setItem('userLocation', JSON.stringify(coords))
            getFiveDaysForecast(position)
        }, () => getTodayWeatherData());
    }
    
    const checkCurrentHour = () => {
        const card = document.getElementById('card')
        if(new Date().getHours() >= 18 && new Date().getHours() <= 6) card.className = 'card night'
    }

    const esDateToDayNameenDate = (esDate) => {
        let formatedMonth = ""
        if(esDate.split("/")[1] === "ENE")formatedMonth = "JAN"
        if(esDate.split("/")[1] === "DIC") esDate.split("/")[1] = "DEC"
        const formatedDate = `${esDate.split("/")[0]}/${formatedMonth}/${esDate.split("/")[2]}`
        return new Date(formatedDate).toLocaleString('es-ar', {weekday:'long'})
    }

    const esDateToDayAndMonthhenDate = (esDate) => {
        const formatedDate = `${esDate.split("/")[0]}/${esDate.split("/")[1]}`
        return formatedDate
    }
   
    const currentHourLocationsFilter = (weather) => {
        const currentHour = new Date().getHours()
        let currentHourWeather = []
        weather.forEach((item, id) => {
            const hour = item.hour.replace('Hs','')
            if(hour > (currentHour - 2) && hour < (currentHour + 2)) {
                currentHourWeather.push(weather[id])
            }
        })
        return currentHourWeather
    }

    const currentDayLocationsFilter = (weather) => {
        let currentDayWeather = []
        let currentDay = new Date().getDate()
        if(currentDay.length === 1) currentDay = "0" + currentDay
        weather.forEach((item) => {
            if(JSON.parse(item.date.split("/")[0]) === currentDay) {
                currentDayWeather.push(item)
            }
        })
        return currentDayWeather
    }

    const filterUserLocationWeather = (userLocationWeather, weather) => {
        const currentDayWeather = currentDayLocationsFilter(userLocationWeather)
        const currentHourWeather = currentHourLocationsFilter(userLocationWeather)
        localStorage.setItem('currentHourBAWeather', JSON.stringify(currentHourWeather))
        localStorage.setItem('currentDayBAWeather', JSON.stringify(currentDayWeather))
        localStorage.setItem('BAWeather', JSON.stringify(userLocationWeather))
        localStorage.setItem('weather', JSON.stringify(weather))
        localStorage.setItem('currentHour', new Date().getHours())
        setCurrentHourBAWeather(currentHourWeather)
    }

    const csvFiveDaysWeatherToArray = (string) => {
        const csv = string.split("\n")
        delete csv[0]
        const json = []
        for (let [_, value] of Object.entries(csv)) {
            var data_splitted = value.split(",")
            var content = {}
            content["station_name"] = data_splitted[0]
            content["date"] = data_splitted[1]
            content["hour"] = data_splitted[2]
            content["temperature"] = data_splitted[3]
            content["wind_direction"] = data_splitted[4]
            content["wind_speed"] = data_splitted[5]
            content["precipitation_mm"] = data_splitted[6]
            content["location"] = data_splitted[7]
            if(data_splitted.length === 8) json.push(content)
        }
        return json
    }

    const {getFiveDaysForecast} = useLocationWeather(filterUserLocationWeather, csvFiveDaysWeatherToArray)
    const {getTodayWeatherData} = useDefaultWeather(filterUserLocationWeather, csvFiveDaysWeatherToArray)

    return {currentHourBAWeather, formatProvince, esDateToDayNameenDate, esDateToDayAndMonthhenDate, currentHourLocationsFilter, currentDayLocationsFilter}
}

export default useHome
