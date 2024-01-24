import styles from './Layout.module.css';
import { useEffect, useState, cloneElement, } from "react";
import Header from '../header/Header'
import axios from "axios";

export default function Layout({ children }) {
   const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
   const [country, setCountry] = useState('');
   const [weatherData, setWeatherData] = useState(null);
   const apiKey = 'ee877d78c32dc168305526a0ce46ed32';
   const [hourlyForecast, setHourlyForecast] = useState([]);
   const [cityInput, setCityInput] = useState("");
   const [selectedDay, setSelectedDay] = useState(null);
   const [weatherDataForFiveDays, setWeatherDataForFiveDays] = useState(null)
   const myCity = 'Ivano-Frankivsk';
   

   // Погода по координатам

   const getWeatherDataByCoordinates = (latitude, longitude) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
         .then(response => {
            setWeatherData(response.data);
            setCountry(response.data.sys.country);
         })
         .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);            
         });         
   };

   const getWeatherAndHourlyForecast = (city) => {
      getWeatherDataByCity(city);
      getHourlyForecastByCity(city);
   }

   // запрос почасового прогноза по координатам

   const getHourlyForecastByCoord = (latitude, longitude) => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
         .then(response => {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            const todayTime = today.getTime();
            const hourlyData = response.data.list
               .filter(item => new Date(item.dt * 1000) <= todayTime)
               .map(item => ({
                  time: item.dt_txt,
                  icon: item.weather[0].icon,
                  temperature: item.main.temp,
                  feelsLike: item.main.feels_like,
                  windSpeed: item.wind.speed,
                  windDirection: item.wind.deg
               }));
            setHourlyForecast(hourlyData);
         })
         .catch(error => {
            console.error('Ошибка при получении почасового прогноза:', error);
         });
   }

   // запрос почасового прогноза по названию города

   const getHourlyForecastByCity = (cityInput) => {
      if (cityInput && cityInput !== '') {
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`)
            .then(response => {
               const today = new Date();
               today.setHours(23, 59, 59, 999);
               const todayTime = today.getTime();
               const hourlyData = response.data.list
                  .filter(item => new Date(item.dt * 1000) <= todayTime)
                  .map(item => ({
                     time: item.dt_txt,
                     icon: item.weather[0].icon,
                     temperature: item.main.temp,
                     feelsLike: item.main.feels_like,
                     windSpeed: item.wind.speed,
                     windDirection: item.wind.deg
                  }));
               setHourlyForecast(hourlyData);
            })
            .catch(error => {
               alert('Місто введено не вірно')
               console.error('Ошибка при получении почасового прогноза:', error);
            });
      }
   }

   // запрос текущего прогноза по названию города

   const getWeatherDataByCity = (city) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
         .then(response => {
            setWeatherData(response.data);
            setCountry(response.data.sys.country);            
         })
         .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);
         });        
   }

   const handleCityInputChange = (event) => {
      setCityInput(event.target.value);
   }

   // запрос погоды на 5 дней по координатам

   const weatherForFiveDays = (latitude, longitude) => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
         .then(response => {
            setWeatherDataForFiveDays(response.data);
         })
         .catch(error => {
            console.error('Помилка при отриманні даних про погоду:', error);
         });
   }

   // запрос погоды на 5 дней по названию города

   const weatheForFiveDaysByCity = (city) => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
         .then(response => {
            setWeatherDataForFiveDays(response.data);
         })
         .catch(error => {
            console.error('Помилка при отриманні даних про погоду:', error);
         });
   }
   if(country !== ""){
      console.log(country);
   }

   useEffect(() => {
      if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition(function (position) {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
            getWeatherDataByCoordinates(latitude, longitude);
            weatherForFiveDays(latitude, longitude);
            getHourlyForecastByCoord(latitude, longitude);
         });
      } else {
         getWeatherDataByCity(myCity);
         weatheForFiveDaysByCity(myCity);
         getHourlyForecastByCity(myCity)
         console.log('Геолокация не поддерживается в этом браузере');
      }

   }, [cityInput]);

   return (
      <div className={styles["layout-inner"]}>
         <div className={styles.wrapper}>
            <Header />
            {cloneElement(children, { coordinates, weatherData, cityInput, getHourlyForecastByCity, handleCityInputChange, getWeatherAndHourlyForecast, hourlyForecast, weatherForFiveDays, selectedDay, setSelectedDay, weatherDataForFiveDays, weatheForFiveDaysByCity, country })}
         </div>
      </div>
   );
}