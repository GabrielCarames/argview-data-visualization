import { useState } from "react"
import useWeather from "../hooks/useWeather"
import useHome from "../hooks/useHome"

export default function Weather() {
    const {currentHourBAWeather, currentDayBAWeather, getDirection, getWeatherFromDay, activeCurrentHourItem, celsiusToFahrenheit, setSearchWeather, weatherResults, getWeatherFromLocation, showWeatherList} = useWeather()
    const {esDateToDayNameenDate, esDateToDayAndMonthhenDate, formatProvince} = useHome()
    const [activeCard, setActiveCard] = useState(0)

    return (
        <div className="weather-container">
            <div className="searcher">
                <h4 className="searcher__title">El tiempo en...</h4>
                <div className="input-container">
                    <i className="fas fa-search"></i>
                    <input className="searcher__input" type="text" placeholder="Buscar" onChange={e => setSearchWeather(e.target.value)} />
                </div>
                <ul className="results list" id="weather-list">
                    {
                        showWeatherList && weatherResults.map((item, id) => {
                            return (
                                <li className="list__item" key={id} onClick={() => getWeatherFromLocation(item.station_name)}>
                                    {item.station_name ? <i className="fas fa-map-marker-alt"></i> : <div></div>}
                                    <p className="list__province">{item.station_name ? formatProvince(item.station_name) : item}</p>
                                    {item.station_name ? <img className="list__flag" src="https://www.meteored.com.ar/css/2018/icons/banderas18/67.svg" alt="flag"></img> : <div></div>}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="five-days-weather">
                <h4 className="five-days-weather__title">El tiempo en {currentHourBAWeather && currentHourBAWeather.length >= 1 && formatProvince(currentHourBAWeather[0].station_name)} en cinco dias</h4>
                <ul className="list">
                    {currentHourBAWeather && currentHourBAWeather.length >= 1 && currentHourBAWeather.map((weather, id) => {
                        return (
                            <li className={activeCard === id ? "list__item active" : "list__item"} key={id} onClick={() => {getWeatherFromDay(weather); setActiveCard(id)}}>
                                <div className="date-container">
                                    <span className="list__day">{id !== 0 ? esDateToDayNameenDate(weather.date) : "Hoy"}</span>
                                    <span className="list__date">{esDateToDayAndMonthhenDate(weather.date)}</span>
                                </div>
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <span className="list__temperature">{weather.temperature}°</span>
                                <span className="list__wind-direction">{getDirection(weather.wind_direction)}</span>
                                <span className="list__wind-speed">{weather.wind_speed}km/h</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="today-weather">
                <h4 className="today-weather__title">Clima en {currentDayBAWeather && currentDayBAWeather.length >= 1 && formatProvince(currentHourBAWeather[0].station_name)}, &nbsp;{currentDayBAWeather && currentDayBAWeather.length >= 1 && esDateToDayNameenDate(currentDayBAWeather[0].date)} {currentDayBAWeather && currentDayBAWeather.length >= 1 && esDateToDayAndMonthhenDate(currentDayBAWeather[0].date)}</h4>
                <ul className="list">
                    {currentDayBAWeather && currentDayBAWeather.length >= 1 && currentDayBAWeather.map((weather, id) => {
                        return (
                            <li className={activeCurrentHourItem(weather)} key={id}>
                                <p className="list__hour">{weather.hour}</p>
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <p className="list__temperature">
                                    <span className="list__celsius">{Math.round(weather.temperature)}°C/</span>
                                    <span className="list__fahrenheit">{celsiusToFahrenheit(weather.temperature)}°F</span>
                                </p>
                                <div className="weather__precipitation">
                                    <i className="fas fa-cloud-rain"></i>
                                    <span className="list__precipitation">{weather.precipitation_mm}%</span>
                                </div>
                                <div className="wind-direction">
                                    <i className="fas fa-arrow-up" style={{"transform": `rotate(${weather.wind_direction}deg)`}}></i>
                                    <span className="list__wind-direction">{getDirection(weather.wind_direction)}</span>
                                </div>
                                <div className="wind-speed">
                                    <i className="fas fa-wind"></i>
                                    <span className="list__wind-speed">{weather.wind_speed}km/h</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
           </div>
        </div>
    )
}
