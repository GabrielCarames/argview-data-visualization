import { Link } from 'react-router-dom'
import useHome from "../hooks/useHome"

export default function Home() {
    const {currentHourBAWeather, formatProvince, esDateToDayNameenDate, esDateToDayAndMonthhenDate} = useHome()

    return (
        <div className="home">
            <div className="todays-weather weather">
                <div className="weather__title-container">
                    <h2 className="weather__title">Pronóstico de cinco dias en {currentHourBAWeather && currentHourBAWeather.length >= 1 && formatProvince(currentHourBAWeather[0].station_name)}</h2>
                    <Link className="see-more" to="/weather"> 
                        <button className="see-more__button">Ver más detalles</button>
                    </Link>
                </div>
                <div className="cards-container">
                    {
                        currentHourBAWeather && currentHourBAWeather.length >= 1 && currentHourBAWeather.slice(0, 5).map((weather, id) => {
                            return (
                                <figure className="card" id="card" key={id}>
                                    <div className="temperature">
                                        <div className="header">
                                            <i className="fas fa-sun"></i>
                                            <i className="fas fa-moon"></i>
                                            <span className="temperature__data">{Math.round(weather.temperature)}°C</span>
                                        </div>
                                        {id === 0 &&
                                            <div className="card-data">
                                                <p className="card__hour">Hora {weather.hour}</p>
                                                <div className="wind-data">
                                                    <p className="card__wind">Viento</p>
                                                    <p className="card__wind-direction">{weather.wind_direction}°</p>
                                                    <i className="fas fa-arrow-up" style={{"transform": `rotate(${weather.wind_direction}deg)`}}></i>
                                                    <p className="card__wind-speed">{weather.wind_speed} km/h</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="weather-data">
                                        <p className="weather__text">{id !== 0 ? esDateToDayNameenDate(weather.date) : "Hoy"}</p>
                                        <p className="weather__location">{esDateToDayAndMonthhenDate(weather.date)}</p>
                                    </div>
                                </figure>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
