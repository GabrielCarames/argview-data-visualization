import axios from 'axios';

const useLocationWeather = (setBAWeather) => {
    let currentHourWeather = []

    const currentHourLocationsFilter = (weather) => {
        const currentHour = new Date().getHours()
        weather.forEach((item, id) => {
            const hour = item.hour.replace('Hs','')
            if(hour > (currentHour - 2) && hour < (currentHour + 2)) {
                currentHourWeather.push(weather[id])
            }
        })
    }
    
    const weatherState = () => {
        for (const weather of currentHourWeather) {
            if(Math.round(weather.temperature) > 20) {
                weather.state = "Soleado"
                setBAWeather(BAWeather => [...BAWeather, weather])
            }
            if(Math.round(weather.temperature) < 20) {
                weather.state = "Despejado"
                setBAWeather(BAWeather => [...BAWeather, weather])
            }
            if(Math.round(weather.temperature) < 10) {
                weather.state = "Frio"
                setBAWeather(BAWeather => [...BAWeather, weather])
            }
        }
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
          content["hour"] = data_splitted[2];
          content["temperature"] = data_splitted[3];
          content["wind_direction"] = data_splitted[4];
          content["wind_speed"] = data_splitted[5];
          content["precipitation_mm"] = data_splitted[6];
          if (json[location]) json[location].push(content);
        }
        return json;
    }

    const getLocalWeather = (weather, position) => {
        const fiveDaysWeather = csvFiveDaysWeatherToArray(weather)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        let closestLocation = 0
        for (const item in fiveDaysWeather) {
            if(Math.abs((Math.abs(latitude - item.split(' ')[0]) + Math.abs(longitude - item.split(' ')[1]))) > closestLocation) closestLocation = fiveDaysWeather[item] //verifica la locacion mas cercana a partir del valor absoluto de la resta de ambas latitudes y longitudes y guarda su referencia
        }
        return closestLocation
    }

    const getFiveDaysForecast = async (position) => {
        await axios.get('https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/2022-01-04.csv').then((res) => {
            const closestLocation = getLocalWeather(res.data, position)
            currentHourLocationsFilter(closestLocation)
            weatherState()
        })
    }

    return {getFiveDaysForecast}
}

export default useLocationWeather
