// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


const weatherApi = {
    key: API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

var input = document.getElementById('city');
var weathershow = document.getElementById('weather-show');

weathershow.style.display = 'none';
input.addEventListener('keypress', function (event) {
    if (event.key == "Enter") {
        console.log(input.value);
        getweatherDetails(input.value);

    }
});

function getweatherDetails(city) {
    // console.log("in the getweatherDetails function");
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`).then((weather) => {
        // console.log("in the then function");
        weathershow.style.display = 'block';
        return weather.json();
    }).then(showWeatherDetails).catch((error) => {
        weathershow.innerHTML = `<p style="color:red;font-family:sans-serif">Sorry,city '${input.value.charAt(0).toUpperCase() + input.value.slice(1)}' Not in the database</p>`
        document.body.style = `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(img/large/default.jpg)`;
    })
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
    let cityDate = document.getElementById('city-date')

    city.innerText = `${weather.name},${weather.sys.country}`;
    temp.innerText = `${Math.round(weather.main.temp)}`;
    maxtemp.innerText = `${Math.ceil(weather.main.temp_max)}`;
    mintemp.innerText = `${Math.floor(weather.main.temp_min)}`;
    climate.innerText = `${weather.weather[0].main}`;
    body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(img/large/${weather.weather[0].main.toLowerCase()}.jpg)`;
    // img.src = `img/small/${weather.weather[0].main.toLowerCase()}.png`;
    img.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    let date = new Date();
    // let utc = date.getTime();
    // let nd = new Date(utc + 3600000);
    // let s = date.valueOf();
    // console.log(s);
    // let p = s - 19800;
    // console.log(p);
    cityDate.innerText = calcDate(date);
}

function calcDate(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let dayNo = date.getDate();
    let day = days[date.getDay()];
    return `${day} ${dayNo} ${month},${year}`;
}