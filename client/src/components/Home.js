import useHome from "../hooks/useHome";

export default function Home() {
    
    const {BAfires, BAWeather, checkCurrentHour, formatProvince} = useHome()

    return (
        <div className="home">
            <div className="todays-weather weather">
                <div className="weather__title-container">
                    <h2 className="weather__title">Pronostico de cinco dias en Buenos Aires</h2>
                    che enm caso de que no te acepte la ubicacion, mostrar la de buenos aires por 5 diasd
                    <a className="see-more" href="/">
                        <button className="see-more__button">Ver más detalles</button>
                    </a>
                </div>
                <div className="cards-container">
                    {console.log("asda", BAWeather)}
                    {
                        BAWeather && BAWeather.length >= 1 && BAWeather.map((weather, id) => {
                            return (
                                <figure className="card" id="card" key={id}>
                                    <div className="temperature">
                                        <span className="temperature__data">{Math.round(weather.temperature)}°C</span>
                                    </div>
                                    <div className="weather-data">
                                        <i className="fas fa-sun"></i>
                                        <i className="fas fa-moon"></i>
                                        <p className="weather__text">Hoy - {weather.state}</p>
                                        <p className="weather__location">{formatProvince(weather.station_name)}</p>
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
