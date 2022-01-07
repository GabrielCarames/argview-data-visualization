import useWeather from "../hooks/useWeather"

export default function Weather() {
    const {BAWeather} = useWeather()

    return (
        <div className="weather-container">
            <div className="searcher">
                <h4 className="searcher__title">Buscar el tiempo en...</h4>
                <input className="searcher__input" type="text" />
            </div>
            <div className="five-days-weather">
                <h4 className="five-days-weather__title">El tiempo en Buenos Aires en cinco dias</h4>
                <ul className="list">
                    {BAWeather && BAWeather.length >= 1 && BAWeather.splice(0, 5).map((weather, id) => {
                        return (
                            <li className="list__item" key={id}>
                                <p className="list__day">Hoy</p>
                                <p className="list__date">7/EN</p>
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
                <h4 className="today-weather__title">Clima en Buenos Aires, hoy 8 de enero</h4>
                <ul className="list">
                    <li className="list__item">
                        
                    </li>
                </ul>
           </div>
        </div>
    )
}
