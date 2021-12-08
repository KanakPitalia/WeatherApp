// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


const weatherApi = {
    key: API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

var input = document.getElementById('city');
var weathershow = document.getElementById('weather-show');

// weathershow.style.display = 'none';
input.addEventListener('keypress', function (event) {
    if (event.key == "Enter") {
        console.log(input.value);
        getweatherDetails(input.value);
        // weathershow.style.display = 'block';
    }
});

function getweatherDetails(city) {
    // console.log("in the getweatherDetails function");
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`).then((weather) => {
        // console.log("in the then function");
        return weather.json();
    }).then(showWeatherDetails)
}
function showWeatherDetails(weather) {
    console.log(weather);
    let city = document.getElementById('city-name');
    let temp = document.getElementById('current-temperature');
    let maxtemp = document.getElementById('max_temp');
    let mintemp = document.getElementById('min_temp');
    let climate = document.getElementById('weather-name');
    let body = document.getElementById('body');
    let img = document.getElementById('img');
    // let cityDate = document.getElementById('city-date')

    city.innerText = `${weather.name},${weather.sys.country}`;
    temp.innerText = `${Math.round(weather.main.temp)}`;
    maxtemp.innerText = `${Math.ceil(weather.main.temp_max)}`;
    mintemp.innerText = `${Math.floor(weather.main.temp_min)}`;
    climate.innerText = `${weather.weather[0].main}`;
    body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(img/large/${weather.weather[0].main.toLowerCase()}.jpg)`;
    img.src = `img/small/${weather.weather[0].main.toLowerCase()}.png`;
    // cityDate.innerText = `${calcDate(weather).getDay(), calcDate(weather).getFullYear()}`;
}

// function calcDate(weather) {
//     var date_in_milli = weather.dt;
//     console.log(date_in_milli.Date);

//     var date = new Date(date_in_milli);
//     dateString = date.toUTCString();
//     console.log(dateString);
//     return date;
// }