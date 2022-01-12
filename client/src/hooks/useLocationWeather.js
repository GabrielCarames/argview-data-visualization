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
        console.log("arr", weather[0].date.split("/")[0], currentDay)
        weather.forEach((item) => {
            console.log("levioza", typeof item.date.split("/")[0], typeof JSON.parse(item.date.split("/")[0]))
            if(JSON.parse(item.date.split("/")[0]) === currentDay) {
                currentDayWeather.push(item)
            }
        })
        return currentDayWeather
    }
    
    const weatherState = () => {
        // for (const weather of currentHourWeather) {
        //     if(Math.round(weather.temperature) > 20) {
        //         weather.state = "Soleado"
        //         setBAWeather(BAWeather => [...BAWeather, weather])
        //     }
        //     if(Math.round(weather.temperature) < 20) {
        //         weather.state = "Despejado"
        //         setBAWeather(BAWeather => [...BAWeather, weather])
        //     }
        //     if(Math.round(weather.temperature) < 10) {
        //         weather.state = "Frio"
        //         setBAWeather(BAWeather => [...BAWeather, weather])
        //     }
        // }
        // console.log("prikmerputti", currentHourWeather)
        // localStorage.setItem('BAWeather', JSON.stringify(currentHourWeather))
        // localStorage.setItem('currentHour', new Date().getHours())
        // localStorage.setItem('currentDayBAWeather', JSON.stringify(currentDayWeather))
        // setBAWeather(currentHourWeather)
    }

    const csvFiveDaysWeatherToArray = (string) => {
        const csv = string.split("\n");
        delete csv[0];
        const json = {};
        for (let [_, value] of Object.entries(csv)) {
          var location = value.split(",")[7];
          if (!(location in json) && location !== "None\r" && location !== undefined)
            json[location] = [];
        }
        for (let [_, value] of Object.entries(csv)) {
          var data_splitted = value.split(",");
          var location = data_splitted[7];
          var content = {};
          content["station_name"] = data_splitted[0];
          content["date"] = data_splitted[1];
          content["hour"] = data_splitted[2];
          content["temperature"] = data_splitted[3];
          content["wind_direction"] = data_splitted[4];
          content["wind_speed"] = data_splitted[5];
          content["precipitation_mm"] = data_splitted[6];
          if (json[location]) json[location].push(content);
        }
        return json;
    }

    const getUserLocationWeather = (weather, position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        let closestLocation = 0
        for (const item in weather) {
            if(Math.abs((Math.abs(latitude - item.split(' ')[0]) + Math.abs(longitude - item.split(' ')[1]))) > closestLocation) closestLocation = weather[item] //verifica la locacion mas cercana a partir del valor absoluto de la resta de ambas latitudes y longitudes y guarda su referencia
        }
        console.log(closestLocation)
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

    const getFiveDaysForecast = async (position) => {
        const currentDay = ("0" + new Date().getDate()).slice(-2)
        // https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-${currentDay}.csv
        await axios.get(`https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-11.csv`).then((res) => {
            const weather = csvFiveDaysWeatherToArray(res.data)
            const userLocationWeather = getUserLocationWeather(weather, position)
            filterUserLocationWeather(userLocationWeather, weather)
            // console.log("cloests", closestLocation)
            // currentDayLocationsFilter(closestLocation)
            // currentHourLocationsFilter(closestLocation)
            // weatherState()
        })
    }

    return {getFiveDaysForecast}
}

export default useLocationWeather
