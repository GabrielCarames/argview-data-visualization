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
                    {console.log("asda", BAWeather)}
                    {
                        BAWeather && BAWeather.length >= 1 && BAWeather.slice(0, 5).map((weather, id) => {
                            return (
                                <figure className="card" id="card" key={id}>
                                    <div className="temperature">
                                        <i className="fas fa-sun"></i>
                                        <i className="fas fa-moon"></i>
                                        <span className="temperature__data">{Math.round(weather.temperature)}°C</span>
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
