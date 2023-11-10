import { useState, useEffect } from "react";
import axios from "axios";
import styles from './NearlyCities.module.css';

const NearlyCities = () => {
   const [lvivWeather, setLvivWeather] = useState(null);
   const [odesaWeather, setOdesaWeather] = useState(null);
   const [kyivWeather, setKyivWeather] = useState(null);
   const [dniproWeather, setDniproWeather] = useState(null);

   useEffect(() => {
      const citiesArr = ["Lviv", "Odesa", "Kyiv", "Dnipro"];

      const fetchWeatherData = async (city, setWeatherData) => {
         try {
            const response = await axios.get(
               `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee877d78c32dc168305526a0ce46ed32&units=metric`
            );
            setWeatherData(response.data);
         } catch (error) {
            console.error(`Ошибка при получении данных для ${city}:`, error);
         }
      };

      citiesArr.forEach((city, index) => {
         switch (index) {
            case 0:
               fetchWeatherData(city, setLvivWeather);
               break;
            case 1:
               fetchWeatherData(city, setOdesaWeather);
               break;
            case 2:
               fetchWeatherData(city, setKyivWeather);
               break;
            case 3:
               fetchWeatherData(city, setDniproWeather);
               break;
            default:
               break;
         }
      });
   }, []);

   return (
      <div className={styles.nearly}>
         <h2 className={styles.title}>Погода зараз в інших містах:</h2>
         <ul className={styles['cities-items']}>
            {[
               { city: "Lviv", weather: lvivWeather },
               { city: "Odesa", weather: odesaWeather },
               { city: "Kyiv", weather: kyivWeather },
               { city: "Dnipro", weather: dniproWeather },
            ].map(({ city, weather }) => (
               <li key={city} className={styles['cities-item']}>
                  <h4 className={styles.tac}>{city}</h4>
                  <p className={styles.icon}>{weather ? <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Иконка" /> : ''}</p>
                  <p>Температура: <span className='bold'>{weather ? `${weather.main.temp}°C` : "Загрузка..."}</span></p>
               </li>
            ))}
         </ul>
      </div>
   );
};
export default NearlyCities;
