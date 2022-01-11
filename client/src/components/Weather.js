import useHome from "../hooks/useHome"
import useWeather from "../hooks/useWeather"

export default function Weather() {
    const {BAWeather, currentDayBAWeather, getDirection, getWeatherFromDay, activeCurrentHourItem} = useWeather()
    const {esDateToDayNameenDate, esDateToDayAndMonthhenDate, formatProvince} = useHome()

    return (
        <div className="weather-container">
            <div className="searcher">
                <h4 className="searcher__title">Buscar el tiempo en...</h4>
                <input className="searcher__input" type="text" />
            </div>
            <div className="five-days-weather">
                <h4 className="five-days-weather__title">El tiempo en {BAWeather && BAWeather.length >= 1 && formatProvince(BAWeather[0].station_name)} en cinco dias</h4>
                <ul className="list">
                    {BAWeather && BAWeather.length >= 1 && BAWeather.map((weather, id) => {
                        return (
                            <li className="list__item" key={id} onClick={() => getWeatherFromDay(weather)}>
                                <p className="list__day">{id !== 0 ? esDateToDayNameenDate(weather.date) : "Hoy"}</p>
                                <p className="list__date">{esDateToDayAndMonthhenDate(weather.date)}</p>
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <p className="list__temperature">{weather.temperature}°</p>
                                <p className="list__wind-direction">{getDirection(weather.wind_direction)}</p>
                                <p className="list__wind-speed">{weather.wind_speed}km/h</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="today-weather">
                <h4 className="today-weather__title">Clima en {currentDayBAWeather && currentDayBAWeather.length >= 1 && formatProvince(BAWeather[0].station_name)} hoy, {currentDayBAWeather && currentDayBAWeather.length >= 1 && esDateToDayNameenDate(currentDayBAWeather[0].date)} {currentDayBAWeather && currentDayBAWeather.length >= 1 && esDateToDayAndMonthhenDate(currentDayBAWeather[0].date)}</h4>
                <ul className="list">
                    {currentDayBAWeather && currentDayBAWeather.length >= 1 && currentDayBAWeather.map((weather, id) => {
                    // console.log("jonhfus", weather.hour.replace('Hs',''))
                        return (
                            <li className={activeCurrentHourItem(weather)} key={id}>
                                <p className="list__hour">{weather.hour}</p>
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <p className="list__temperature">{Math.round(weather.temperature)}°C/88°F</p>
                                <div className="weather__precipitation">
                                    <i className="fas fa-cloud-rain"></i>
                                    <p className="list__precipitation">{weather.precipitation_mm}%</p>
                                </div>
                                <div className="wind-direction">
                                    <i className="fas fa-arrow-up"></i>
                                    <p className="list__wind-direction">{getDirection(weather.wind_direction)}</p>
                                </div>
                                <div className="wind-speed">
                                    <i className="fas fa-wind"></i>
                                    <p className="list__wind-speed">{weather.wind_speed}km/h</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
           </div>
        </div>
    )
}
