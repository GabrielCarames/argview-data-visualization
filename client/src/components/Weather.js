import useHome from "../hooks/useHome"
import useWeather from "../hooks/useWeather"

export default function Weather() {
    const {BAWeather} = useWeather()
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
                    {BAWeather && BAWeather.length >= 1 && BAWeather.slice(0, 5).map((weather, id) => {
                        return (
                            <li className="list__item" key={id}>
                                <p className="list__day">{id !== 0 ? esDateToDayNameenDate(weather.date) : "Hoy"}</p>
                                <p className="list__date">{esDateToDayAndMonthhenDate(weather.date)}</p>
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <p className="list__temperature">{weather.temperature}°</p>
                                <p className="list__wind-direction">South</p>
                                <p className="list__wind-speed">30km/h</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="today-weather">
                <h4 className="today-weather__title">Clima en {BAWeather && BAWeather.length >= 1 && formatProvince(BAWeather[0].station_name)}, hoy 8 de enero</h4>
                <ul className="list">
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    <li className="list__item">
                        <p className="list__hour">11:00hs</p>
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                        <p className="list__temperature">35°C/88°F</p>
                        <div className="weather__precipitation">
                            <i className="fas fa-cloud-rain"></i>
                            <p className="list__precipitation">33%</p>
                        </div>
                        <div className="wind-direction">
                            <i className="fas fa-arrow-up"></i>
                            <p className="list__wind-direction">South</p>
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i>
                            <p className="list__wind-speed">30km/h</p>
                        </div>
                    </li>
                    {/* {
                        BAWeather && BAWeather.length >= 1 && BAWeather.map((weather, id) => {
                            return (
                                <li className="list__item" key={id}>
                                    <p className="list__hour"></p>
                                    <i className="fas fa-sun"></i>
                                    <i className="fas fa-moon"></i>
                                    <p className="list__temperature">{weather.temperature}°</p>
                                    <div className="wind-direction">
                                        <i className="fas fa-arrow-up" style={{"transform": `rotate(${weather.wind_direction}deg)`}}></i>
                                        <p className="list__wind-direction">South</p>
                                    </div>
                                    <div className="wind-speed">
                                        <i className="fas fa-wind"></i>
                                        <p className="list__wind-speed">30km/h</p>
                                    </div>
                                </li>
                            )
                        })
                    } */}
                </ul>
           </div>
        </div>
    )
}
