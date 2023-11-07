import styles from './App.module.css';
import { FcSearch } from "react-icons/fc";
import Loader from '../loader/Loader';

function App({ weatherData, cityInput, handleCityInputChange, getWeatherAndHourlyForecast, hourlyForecast }) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  
  const calculateDayDuration = () => {
    if (weatherData && weatherData.sys && weatherData.sys.sunrise && weatherData.sys.sunset) {
      const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
      const sunsetTime = new Date(weatherData.sys.sunset * 1000);
      const dayDurationMilliseconds = sunsetTime - sunriseTime;      
      const hours = Math.floor(dayDurationMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((dayDurationMilliseconds / (1000 * 60)) % 60);
      return `${hours} годин ${minutes} хвилин`;
    } else {
      return 'N/A';
    }
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className={styles.location}>
          <h2>Ви зараз в <span className={styles.italic}>{weatherData ? weatherData.name : ''}</span></h2>
          <input
            type="text"
            placeholder={weatherData ? weatherData.name : ''}
            value={cityInput}
            onChange={handleCityInputChange}
          />
          <button className={styles.search} onClick={() => getWeatherAndHourlyForecast(cityInput)}><FcSearch /></button>
        </div>
        {(weatherData) ? (
          <div className={styles['weather-today']}>
            <h2>Погода на сьогодні <span className={styles.date}>{`${day}.${month}.${year}`}</span> в <span className={styles.bold}>{weatherData ? weatherData.name : ''}</span>:</h2>
            <p><img src={`https://openweathermap.org/img/wn/${weatherData ? weatherData.weather[0].icon : ''}.png`} alt="icon" /></p>
            <p>Температура: <span className={styles.bold}>{(weatherData && weatherData.main && weatherData.main.temp) ? weatherData.main.temp : ''}°C</span></p>
            <p>Відчувається як: <span className={styles.bold}>{weatherData.main ? weatherData.main.feels_like : 'N/A'}°C</span></p>
            <p>Опис: <span className={styles.bold}>{weatherData.weather ? weatherData.weather[0].description : 'N/A'}</span></p>
            <p>Швидкість вітру: <span className={styles.bold}>{weatherData.wind.speed} м/с</span></p>
            <p>Світанок: <span className={styles.bold}>
              {(weatherData && weatherData.sys && weatherData.sys.sunrise) ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : 'N/A'}
            </span></p>
            <p>Захід сонця: <span className={styles.bold}>
              {(weatherData && weatherData.sys && weatherData.sys.sunrise) ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : 'N/A'}
            </span></p>
            <p>Тривалість дня: <span className={styles.bold}>
              {calculateDayDuration()}
            </span></p>
          </div>
        ) : (
          <div className={styles.load}>
            <Loader />
            <p>Завантаження даних про погоду...</p>
          </div>
        )}        
        <h2 className={styles.title}>Погодинний прогноз на залишок дня:</h2>
        <div>
          <ul className={styles.hourly}>
            {hourlyForecast.map((hourData, index) => (
              <li className={styles['hourly-item']} key={index}>
                <p>Час: <span className={styles.bold}>{hourData.time}</span></p>
                <p className={styles.img}><img src={`https://openweathermap.org/img/wn/${hourData.icon}.png`} alt="Иконка" /></p>
                <p>Температура: <span className={styles.bold}>{hourData.temperature}°C</span></p>
                <p>Відчувається як: <span className={styles.bold}>{hourData.feelsLike}°C</span></p>
                <p>Швидкість вітру: <span className={styles.bold}>{hourData.windSpeed} м/с</span></p>
                <p>Направлення вітру: <span className={styles.bold}>{hourData.windDirection}°</span></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
