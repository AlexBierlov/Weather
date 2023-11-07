import Loader from '../loader/Loader';
import styles from './CurrentWeathe.module.css';
import { FcSearch } from "react-icons/fc";

function CurrentWeather({ selectedDay, setSelectedDay, weatherDataForFiveDays, cityInput, handleCityInputChange, weatherData, getWeatherAndHourlyForecast, weatheForFiveDaysByCity }) {
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
               <button className={styles.search} onClick={() => {
                  getWeatherAndHourlyForecast(cityInput);
                  weatheForFiveDaysByCity(cityInput);
               }}><FcSearch /></button>
            </div>
            {weatherDataForFiveDays ? (
               <div className={styles['five-days']}>
                  <h2 className={styles.title}>Погода на 5 днів в <span className={styles.bold}>{weatherDataForFiveDays.city.name}</span>:</h2>
                  <div className={styles["weather-list"]}>
                     {weatherDataForFiveDays.list
                        .filter((item, index) => index % 8 === 0)
                        .map(item => (
                           <div
                              key={item.dt}
                              className={`weather-item ${selectedDay === item.dt ? 'selected' : ''}`}
                              onClick={() => setSelectedDay(item.dt)}
                           >
                              <p>Дата: <span className={styles.bold}>{new Date(item.dt * 1000).toLocaleDateString()}</span></p>
                              <p className={styles.centr}>
                                 <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                              </p>
                              <p>Температура: <span className={styles.bold}>{item.main.temp}°C</span></p>
                              <p>Опис: <span className={styles.bold}>{item.weather[0].description}</span></p>
                              <p>вітер: <span className={styles.bold}>{item.wind.speed} м/с</span></p>
                           </div>
                        ))}
                  </div>
               </div>
            ) : (
               <div className={styles.load}>
                  <Loader />
                  <p>Завантаження даних про погоду...</p>
               </div>
            )}
            {selectedDay && weatherDataForFiveDays ? (
               <div className={styles['five-days']}>
                  <h2 className={styles.title}>Детальний прогноз на <span className={styles.italic}>{new Date(selectedDay * 1000).toLocaleDateString()}</span></h2>
                  <ul className={styles["weather-list"]}>
                     {weatherDataForFiveDays.list
                        .filter(item => {
                           const date = new Date(item.dt * 1000);
                           return date.toLocaleDateString() === new Date(selectedDay * 1000).toLocaleDateString();
                        })
                        .map(item => (
                           <li className={styles['detail-item']} key={item.dt}>
                              <p>Час: <span className={styles.bold}>{new Date(item.dt * 1000).toLocaleTimeString()}</span></p>
                              <p className={styles.centr}>
                                 <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                              </p>
                              <p>Температура: <span className={styles.bold}>{item.main.temp}°C</span></p>
                              <p>Опис: <span className={styles.bold}>{item.weather[0].description}</span></p>
                              <p>Вітер: <span className={styles.bold}>{item.wind.speed} м/с</span></p>
                           </li>
                        ))}
                  </ul>
               </div>
            ) : null}
         </div>
      </div>
   )
}

export default CurrentWeather;
