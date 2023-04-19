const apiKey = "94f9ddaa10f481344738a3bbb0642a35";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// function to get weather data from API or cache
async function getWeatherData(city) {
  const cachedData = localStorage.getItem(city);
  if (cachedData) {
    console.log("Loading data from cache");
    return JSON.parse(cachedData);
  }

  // if data is not cached, fetch from API
  console.log("Fetching data from API");
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  
   if (response.status == 404) {
     throw new Error("City not found");
   } else {
    const data = await response.json();
   
    // cache the data in localStorage
    localStorage.setItem(city, JSON.stringify(data));
    return data;
  }
}

// function to display weather data on the page
function displayWeatherData(data) {
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "mist.png";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// event listener for search button
searchBtn.addEventListener("click", async () => {
  try {
    const city = searchBox.value;
    const data = await getWeatherData(city);
    displayWeatherData(data);
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
});

// display Lahore weather on page load
window.addEventListener("load", async () => {
  try {
    const city = "Lahore";
    const data = await getWeatherData(city);
    displayWeatherData(data);
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
});