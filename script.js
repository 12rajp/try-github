const apiKey ="94f9ddaa10f481344738a3bbb0642a35";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".weather").style.display ="none";
    }else{

        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        if(data.weather[0].main=="Clouds"){
            weatherIcon.src ="clouds.png";
           } 
           else if(data.weather[0].main=="Clear"){
            weatherIcon.src ="clear.png";
           } 
           else if(data.weather[0].main=="Rain"){
            weatherIcon.src ="rain.png";
           }
           else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src ="drizzle.png";
           } 
           else if(data.weather[0].main=="Mist"){
            weatherIcon.src ="mist.png";
           }
           document.querySelector(".weather").style.display="block";
           document.querySelector(".error").style.display="none";
        }
    
    }
    searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
    })
    searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
    })
    const zipCodeInput = document.getElementById('zip-code-input');
    const submitButton = document.getElementById('submit-button');
    
    submitButton.addEventListener('click', () => {
      const zipCode = zipCodeInput.value;
      const apiUrl = `https://api.zippopotam.us/us/${zipCode}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const { places } = data;
          console.log(places);
        })
        .catch(error => {
          console.error(error);
        });
    });
    