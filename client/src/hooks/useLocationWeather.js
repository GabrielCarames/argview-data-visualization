import { useHistory } from "react-router-dom";
import axios from 'axios';

const useLocationWeather = (filterUserLocationWeather, csvFiveDaysWeatherToArray) => {
    const history = useHistory()

    const getUserLocationWeather = (weather, position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        let closestLocation = {province: "", diference: 100}
        let locationWeather = []
        weather.forEach((item) => {
            const closestLocationDiference = Math.abs((Math.abs(latitude - item.location.split(' ')[0]) + Math.abs(longitude - item.location.split(' ')[1]))) 
            locationWeather.push({province: item.station_name, diference: closestLocationDiference}) //a cada provincia le da su numero de diferencia
        })
        locationWeather.forEach((item) => { //luego se saca el menor numero de diferencia que significa la provincia mas cercana
            if(item.diference < closestLocation.diference) closestLocation = item
        })
        return closestLocation
    }

    const getFiveDaysWeatherFromLocation = (userLocationWeather, weather) => {
        return weather.filter((item) => {
            return item.station_name === userLocationWeather.province
        })
    }

    const getFiveDaysForecast = async (position) => {
        const currentDay = ("0" + new Date().getDate()).slice(-2)
        // https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-${currentDay}.csv
        try {
            await axios.get(`https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-14.csv`).then((res) => {
                const weather = csvFiveDaysWeatherToArray(res.data)
                const userLocationWeather = getUserLocationWeather(weather, position)
                const fiveDaysWeatherUserLocation = getFiveDaysWeatherFromLocation(userLocationWeather, weather)
                filterUserLocationWeather(fiveDaysWeatherUserLocation, weather)
            })
        } catch (error) {
            console.log(error)
            history.push(`error/${error}`)
            window.history.pushState({}, null, "/error")
        }
    }

    return {getFiveDaysForecast}
}

export default useLocationWeather
