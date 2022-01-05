import axios from 'axios';

const useDefaultWeather = (setBAWeather) => {
    let currentHourWeather = []

    const currentHourFilter = (weather) => {
        const currentHour = new Date().getHours()
        console.log("weather,avada", weather)
        for (const rawHour in weather) {
            const hour = rawHour.replace('Hs','')
            if(hour > (currentHour - 2) && hour < (currentHour + 2)) {
                currentHourWeather.push(weather[rawHour])
            }
        }
    }

    const buenosAiresWeatherFilter = (weatherArray) => {
        weatherArray[0].forEach(weather => {
            if(weather.station_name === "BUENOS_AIRES") {
                console.log("sead", weather.station_name)
                weatherState(weather)
            }
        });
    }
    
    const weatherState = (weather) => {
        console.log("hola", weather)
        if(Math.round(weather.temperature) > 20) {
            weather.state = "Soleado"
            setBAWeather(weather)
        }
        if(Math.round(weather.temperature) < 20) {
            weather.state = "Despejado"
            setBAWeather(weather)
        }
        if(Math.round(weather.temperature) < 10) {
            weather.state = "Frio"
            setBAWeather(weather)
        }
    }
    
    const csvToArrayConverter = (string) => {
        const csv = string.split("\n");
        delete csv[0];
        const first_year = csv[1].split(",")[0];
        const last_year = csv[Object.keys(csv).length - 1].split(",")[0];
        // console.log("first", first_year, "second", last_year)
        const json = {};
        for (let year = first_year; year <= last_year; year++) json[year] = [];
        for (let [_, value] of Object.entries(csv)) {
            let data = value.split(",");
            let content = {};
            let year = data[0];
            content["año"] = data[0];
            content["provincia"] = data[1];
            content["total"] = data[2];
            content["negligencia"] = data[3];
            content["intencional"] = data[4];
            content["natural"] = data[5];
            content["desconocida"] = data[6];
            if (json[year]) json[year].push(content);
        }
        return json
    }

    const csvWeatherToArray = (string) => {
        const csv = string.split("\n");
        delete csv[0];
        const json = {};
        const hours = ["00Hs","03Hs","06Hs","09Hs","12Hs","15Hs","18Hs","21Hs"];
        for (let index = 0; index < hours.length; index++) json[hours[index]] = [];
        for (let [_, value] of Object.entries(csv)) {
            let data_splitted = value.split(",");
            let hour = data_splitted[2];
            let content = {};
            content["station_name"] = data_splitted[0];
            content["date"] = data_splitted[1];
            content["hour"] = data_splitted[2];
            content["temperature"] = data_splitted[3];
            content["wind_direction"] = data_splitted[4];
            content["wind_speed"] = data_splitted[5];
            content["precipitation_mm"] = data_splitted[6];
            if (json[hour]) json[hour].push(content);
        }
        return json
    }

    const getTodayWeatherData = async () => {
        await axios.get('https://raw.githubusercontent.com/manucabral/argview-reports/main/forecast/today.csv').then((res) => {
            const weather = csvWeatherToArray(res.data)
            console.log("masturbado", weather)
            currentHourFilter(weather)
            buenosAiresWeatherFilter(currentHourWeather)
        })
    }
    
    return {getTodayWeatherData}

}

export default useDefaultWeather