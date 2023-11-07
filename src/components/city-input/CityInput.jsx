export default function CityInput({cityInput, weatherData, handleCityInputChange,getWeatherAndHourlyForecast }) {
   return (
      <>
         <input
            type="text"
            placeholder={weatherData ? weatherData.name : ''}
            value={cityInput}
            onChange={handleCityInputChange}
         />
         <button onClick={() => getWeatherAndHourlyForecast(cityInput)}>Получить погоду</button>
      </>
   )
}