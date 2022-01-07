import useHome from "../hooks/useHome";

export default function Home() {
    
    const {BAfires, BAWeather, checkCurrentHour, formatProvince, esDateToDayNameenDate, esDateToDayAndMonthhenDate, filterWeatherFromToday} = useHome()

    return (
        <div className="home">
            <div className="todays-weather weather">
                <div className="weather__title-container">
                    <h2 className="weather__title">Pronostico de cinco dias en {BAWeather && BAWeather.length >= 1 && formatProvince(BAWeather[0].station_name)}</h2>
                    <a className="see-more" href="/">
                        <button className="see-more__button">Ver más detalles</button>
                    </a>
                </div>
                <div className="cards-container">
                    {
                        BAWeather && BAWeather.length >= 1 && BAWeather.slice(0, 5).map((weather, id) => {
                            return (
                                <figure className="card" id="card" key={id}>
                                    <div className="temperature">
                                        <i className="fas fa-sun"></i>
                                        <i className="fas fa-moon"></i>
                                        <span className="temperature__data">{Math.round(weather.temperature)}°C</span>
                                        {id === 0 &&
                                            <div className="card-data">
                                                <p className="card__hour">Hora {weather.hour}</p>
                                                <div className="wind-data">
                                                    <p className="card__wind-direction">{weather.wind_direction}°</p>
                                                    <i className="fas fa-wind"></i>
                                                    <i className="fas fa-arrow-up" style={{"transform": `rotate(${weather.wind_direction}deg)`}}></i>
                                                </div>
                                                {/* <p className="weather__wind-direction"> {weather.temperature}</p> */}
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
                <div className="chart">
                    {/* <Line options={options} data={data}/> */}
                    {/* {renderBarChart} */}
                </div>

            </div>
        </div>
    )
}
