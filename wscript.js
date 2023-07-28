let result = document.getElementById("result");
let humidityElement = document.querySelector(".humidity");
let windElement = document.querySelector(".wind");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

searchBtn.querySelector("img").src = "search.png";

// Mapping between weather condition codes and icon filenames
const weatherIcons = {
  "01d": "clear_sky.png",
  "02d": "Gnome-weather-few-clouds.svg.png",
  "03d": "scattered_clouds.png",
  "04d": "broken.png",
  "09d": "shower-rain.png",
  "09n": "shower-rain.png",
  "10d": "rain.png",
  "10n": "rain.png",
  "11d": "thunderstorm.png",
  "11n": "thunderstorm.png",
  "13d": "snow.png",
  "13n": "snow.png",
  "14d": "clouds.png",
  "50d": "mist.png",
  "50n": "mist.png",
};

let getWeather = () => {
  let cityValue = cityRef.value;

  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    // Clear the input field
    cityRef.value = "";

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        let weatherCode = data.weather[0].icon;
        let iconFilename = weatherIcons[weatherCode] || "default.png";

        result.innerHTML = `
          <img class="weather-icon" src="${iconFilename}" width="120px" height="120px">
          <h2>${data.name}</h2>
          <h4 class="weather">${data.weather[0].main}</h4>
          <h4 class="desc">${data.weather[0].description}</h4>
          <h1>${data.main.temp} &#176;</h1>
          <div class="temp-container">
              <div>
                  <h4 class="title">min</h4>
                  <h4 class="temp">${data.main.temp_min}&#176;</h4>
              </div>
              <div>
                  <h4 class="title">max</h4>
                  <h4 class="temp">${data.main.temp_max}&#176;</h4>
              </div>
          </div>
        `;

        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/hr`;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
