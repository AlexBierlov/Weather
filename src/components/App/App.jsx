import styles from './App.module.css';
import { FcSearch } from "react-icons/fc";
import Loader from '../loader/Loader';
import NearlyCities from '../nearlyCities/NearlyCities';
import { useEffect, useState } from 'react';

function App({ weatherData, cityInput, handleCityInputChange, getWeatherAndHourlyForecast, hourlyForecast, country }) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const countriesArray = [
    { code: 'UA', name: 'Ukraine' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'JP', name: 'Japan' },
  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  function getCountryNameByCode(country) {
    const countryName = countriesArray.find(countryName => countryName.code === country);
    return countryName ? countryName.name : 'Country not found';
  }



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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);

  return (
    <div className="wrap">
      <div className="container">
        <div className={styles.location}>
          <h2>Ви зараз в <span className={styles.italic}>{weatherData ? weatherData.name : ''}</span></h2>
          <div className={styles.flex}>
            <input
              type="text"
              placeholder={weatherData ? weatherData.name : ''}
              value={cityInput}
              onChange={handleCityInputChange}
            />
            <input
              type="text"
              placeholder={country ? getCountryNameByCode(country) : ''}

            />
            <button className={styles.search} onClick={() => getWeatherAndHourlyForecast(cityInput)}><FcSearch /> {windowWidth <= 500 ? 'Пошук' : ''}</button>
          </div>

        </div>
        {(weatherData) ? (
          <div className={styles['weather-today']}>
            <div className={styles['weahter-today-item']}>
              <h2>Погода на сьогодні <span className={styles.date}>{`${day}.${month}.${year}`}</span> <br /> <span className={styles.bold}>{weatherData ? weatherData.name : ''}</span>:</h2>
              <p><img src={`https://openweathermap.org/img/wn/${weatherData ? weatherData.weather[0].icon : ''}.png`} alt="icon" /></p>
              <p>Температура: <span className={styles.bold}>{(weatherData && weatherData.main && weatherData.main.temp) ? weatherData.main.temp : ''}°C</span></p></div>
            <div><p>Відчувається як: <span className={styles.bold}>{weatherData.main ? weatherData.main.feels_like : 'N/A'}°C</span></p>
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
          </div>
        ) : (
          <div className={styles.load}>
            <Loader />
            <p>Завантаження даних про погоду...</p>
          </div>
        )}
        <h2 className={styles.title}>Погодинний прогноз на залишок дня:</h2>
        <div className={styles.flex}>
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
      <NearlyCities />
    </div>
  );
}

export default App;
