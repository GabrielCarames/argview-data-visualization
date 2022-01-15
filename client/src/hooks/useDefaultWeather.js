import { useHistory } from "react-router-dom";
import axios from 'axios';

const useDefaultWeather = (filterUserLocationWeather, csvFiveDaysWeatherToArray) => {
    const history = useHistory()

    const buenosAiresWeatherFilter = (weatherArray) => {
        let BuenosAiresWeather = []
        weatherArray.forEach(weather => {if(weather.station_name === "BUENOS_AIRES") BuenosAiresWeather.push(weather)})
        return BuenosAiresWeather
    }

    const getTodayWeatherData = async () => {
        const currentDay = ("0" + new Date().getDate()).slice(-2)
        try {
            await axios.get(`https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-${currentDay}.csv`).then((res) => {
                const weather = csvFiveDaysWeatherToArray(res.data)
                const BuenosAiresWeather = buenosAiresWeatherFilter(weather)
                filterUserLocationWeather(BuenosAiresWeather, weather)
            })
        } catch (error) {
            console.log(error)
            history.push(`error/${error}`)
            window.history.pushState({}, null, "/error")
        }
    }

    return {getTodayWeatherData}
}

export default useDefaultWeather