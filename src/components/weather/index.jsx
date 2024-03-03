import { useEffect, useState } from "react";
import Search from "../search";



export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=7d2e5bf70239bf01510df4cf3966b297`);
            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
            console.log(data, "data");
            setWeatherData(data);


        } catch (e) {
            console.log(e)

        }
    }
    function handleSearch() {
        fetchWeatherData(search)
    }
    function getCurrentData() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }
    useEffect(() => {
        fetchWeatherData("bangalore")
    }, []);
    console.log(weatherData);
    return <div>
        <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch} />
        {
            loading ? (<div>Loading....</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentData()}</span>

                    </div>
                    <div className="temp">
                        {weatherData?.main?.temp}
                    </div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description:''}
                    </p>
                    <div className="weather-info">
                        <div>
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="humidity">{weatherData?.wind?.deg}%</p>
                                <p>Wind Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
            )

        }
        
    </div>
}