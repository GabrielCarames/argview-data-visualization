import useHome from "../hooks/useHome";

export default function Home() {
    
    const {BAfires, BAWeather, checkCurrentHour, formatProvince} = useHome()

    return (
        <div className="home">
            <div className="todays-weather weather">
                <div className="weather__title-container">
                    <h2 className="weather__title">Clima de hoy</h2>
                    <a className="see-more" href="/">
                        <button className="see-more__button">Ver más detalles</button>
                    </a>
                </div>
                <div className="cards-container">
                    <figure className="card" id="card">
                        <div className="temperature">
                            {console.log("holasd", BAWeather)}
                            <span className="temperature__data">{BAWeather && Math.round(BAWeather.temperature)}°C</span>
                        </div>
                        <div className="weather-data">
                            <i className="fas fa-sun"></i>
                            <i className="fas fa-moon"></i>
                            <p className="weather__text">Hoy - {BAWeather && BAWeather.state}</p>
                            <p className="weather__location">{BAWeather && formatProvince(BAWeather.station_name)}</p>
                        </div>
                    </figure>
                    <figure className="card">
                        <div className="temperature">
                            <span className="temperature__data">78°C</span>
                        </div>
                        <div className="weather-data">
                            <i className="fas fa-sun"></i>
                            <p className="weather__text">Soleado</p>
                            <p className="weather__location">Buenos Aires</p>
                        </div>
                    </figure>
                    <figure className="card">
                        <div className="temperature">
                            <span className="temperature__data">78°C</span>
                        </div>
                        <div className="weather-data">
                            <i className="fas fa-sun"></i>
                            <p className="weather__text">Soleado</p>
                            <p className="weather__location">Buenos Aires</p>
                        </div>
                    </figure>
                    <figure className="card">
                        <div className="temperature">
                            <span className="temperature__data">78°C</span>
                        </div>
                        <div className="weather-data">
                            <i className="fas fa-sun"></i>
                            <p className="weather__text">Soleado</p>
                            <p className="weather__location">Buenos Aires</p>
                        </div>
                    </figure>
                </div>
                <div className="chart">
                    {/* <Line options={options} data={data}/> */}
                    {/* {renderBarChart} */}
                </div>

            </div>
        </div>
    )
}
