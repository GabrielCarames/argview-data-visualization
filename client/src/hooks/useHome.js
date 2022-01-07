import axios from 'axios';
import { useEffect, useState } from "react";
import useDefaultWeather from "./useDefaultWeather";
import useLocationWeather from "./useLocationWeather";

const useHome = () => {
    const [BAfires, setBAfires] = useState([])
    const [BAWeather, setBAWeather] = useState([])
    const {getFiveDaysForecast} = useLocationWeather(setBAWeather)
    const {getTodayWeatherData} = useDefaultWeather(setBAWeather)

    useEffect(() => {
        checkCurrentHour()
        askForGeoLocation()
    }, [])

    const getFiresData = async () => {
        await axios.get('https://raw.githubusercontent.com/manucabral/argview-reports/main/wildfires/2022-01-01.csv').then((res) => { //a este decirle que tambien me de los de hoy
            // const fires = csvToArrayConverter(res.data)
            // buenosAiresFiresFilter(fires)
            //  console.log("fires", fires)
        })
    }

    const buenosAiresFiresFilter = (fireArray) => {
        for (const item in fireArray) {
            let fire = fireArray[item][0]
            if(fire.provincia === "Buenos Aires")
            setBAfires({year: fire.año, total: fire.total})
        }
    }

    const formatProvince = (str) => {
        var splitStr = str.replace("_", " ").toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const askForGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude, position);
            getFiveDaysForecast(position)
        }, () => getTodayWeatherData());
    }
    
    const checkCurrentHour = () => {
        const card = document.getElementById('card')
        if(new Date().getHours() >= 18 && new Date().getHours() <= 6) {
            card.className = 'card night'
        }
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

    const filterWeatherFromToday = (weather) => {
        const filteredWeather = weather.filter((item) => item.date.split("/")[0] >= "0" + new Date().getDate()).slice(-2)
        console.log("weatherfiltered", filteredWeather)
        return filteredWeather
    }
   
    return {BAfires, BAWeather, checkCurrentHour, formatProvince, esDateToDayNameenDate, esDateToDayAndMonthhenDate, filterWeatherFromToday}
}

export default useHome
