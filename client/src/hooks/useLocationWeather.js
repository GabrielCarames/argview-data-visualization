import axios from 'axios';
import Weather from "../components/Weather";

const useLocationWeather = (setCurrentHourBAWeather) => {
    // let currentHourWeather = []

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
        console.log("waht", weather)
        weather.forEach((item) => {
            if(JSON.parse(item.date.split("/")[0]) === currentDay) {
                currentDayWeather.push(item)
            }
        })
        return currentDayWeather
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
        console.log("closestLocation", locationWeather)
        return closestLocation
    }

    const filterUserLocationWeather = (userLocationWeather, weather) => {
        const currentDayWeather = currentDayLocationsFilter(userLocationWeather)
        console.log("asas", userLocationWeather)
        const currentHourWeather = currentHourLocationsFilter(userLocationWeather)
        localStorage.setItem('currentHourBAWeather', JSON.stringify(currentHourWeather))
        localStorage.setItem('currentDayBAWeather', JSON.stringify(currentDayWeather))
        localStorage.setItem('BAWeather', JSON.stringify(userLocationWeather))
        localStorage.setItem('weather', JSON.stringify(weather))
        localStorage.setItem('currentHour', new Date().getHours())
        setCurrentHourBAWeather(currentHourWeather)
    }

    const getFiveDaysWeatherFromLocation = (userLocationWeather, weather) => {
        return weather.filter((item) => {
            return item.station_name === userLocationWeather.province
        })
    }

    const getFiveDaysForecast = async (position) => {
        const currentDay = ("0" + new Date().getDate()).slice(-2)
        // https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-${currentDay}.csv
        await axios.get(`https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-${currentDay}.csv`).then((res) => {
            const weather = csvFiveDaysWeatherToArray(res.data)
            console.log("consolelog", weather)
            const userLocationWeather = getUserLocationWeather(weather, position)
            const fiveDaysWeatherUserLocation = getFiveDaysWeatherFromLocation(userLocationWeather, weather)
            filterUserLocationWeather(fiveDaysWeatherUserLocation, weather)
            // console.log("cloests", closestLocation)
            // currentDayLocationsFilter(closestLocation)
            // currentHourLocationsFilter(closestLocation)
            // weatherState()
        })
    }

    return {getFiveDaysForecast, currentDayLocationsFilter, currentHourLocationsFilter}
}

export default useLocationWeather
