let lat, lon;
const apiKey = "bc0f42305a74c47d7a81803710b3553c";


function startApp() {
    console.log("Application started.");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log("lat: ", lat, "lon: ", lon);

            getWeatherData();
        });
    }
};

function getWeatherData() {
    btnGeo.disabled = true;
    btnGeo.className = 'disabled';
    document.getElementById("chooseCity").innerText = 'Choose city';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displayWeatherData(data))
        .catch(err => console.log(err));
};

function displayWeatherData(data) {
    const country = data.sys.country;
    const temp = data.main.temp;
    const tempFeel = data.main.feels_like;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const cloudy = data.clouds.all;
    const cloudsDescription = data.weather[0].description;
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const windDir = data.wind.deg;
    let windDirAbbr;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunriseTime = `${sunrise.getHours() < 10 ? '0' + sunrise.getHours() : sunrise.getHours()}:${sunrise.getMinutes() < 10 ? '0' + sunrise.getMinutes() : sunrise.getMinutes()}`
    const sunset = new Date(data.sys.sunset * 1000);
    const sunsetTime = `${sunset.getHours() < 10 ? '0' + sunset.getHours() : sunset.getHours()}:${sunset.getMinutes() < 10 ? '0' + sunset.getMinutes() : sunset.getMinutes()}`;

    const weatherIcon = data.weather[0].icon;
    let weatherImgUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const city = data.name;
    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;
    locationLink.href = `https://openstreetmap.org/#map=12/${lat}/${lon}`;

    if (windDir >= 350 && windDir < 10) windDirAbbr = "N";
    if (windDir >= 350 && windDir < 10) windDirAbbr = "N";
    if (windDir >= 10 && windDir < 80) windDirAbbr = "NE";
    if (windDir >= 80 && windDir < 100) windDirAbbr = "E";
    if (windDir >= 100 && windDir < 170) windDirAbbr = "SE";
    if (windDir >= 170 && windDir < 190) windDirAbbr = "S";
    if (windDir >= 190 && windDir < 260) windDirAbbr = "SW";
    if (windDir >= 260 && windDir < 280) windDirAbbr = "W";
    if (windDir >= 280 && windDir < 350) windDirAbbr = "NW";


    document.getElementById("country").innerText = `(${country})`;
    document.getElementById("temperature").innerText = `${temp} C`;
    document.getElementById("temperatureFeel").innerText = `\n(feels like: ${tempFeel} C)`;
    document.getElementById("pressure").innerText = `${pressure} hPa`;
    document.getElementById("humidity").innerText = `${humidity} %`;
    document.getElementById("cloudy").innerText = `${cloudsDescription} (${cloudy} %)`;
    document.getElementById("visibility").innerText = `${visibility} m`;
    document.getElementById("windSpeed").innerText = `${windSpeed} m/s ${windDirAbbr}`;
    document.getElementById("sunrise").innerText = `${sunriseTime}`;
    document.getElementById("sunset").innerText = `${sunsetTime}`;

    document.getElementById("weatherImg").setAttribute('src', weatherImgUrl);

    btnCity.addEventListener('click', setWeatherData);
    btnCoord.addEventListener('click', goToCoordinates);
};

const btnCity = document.getElementById("chooseCity");
const btnGeo = document.getElementById("chooseGeo");
const btnCoord = document.getElementById("chooseCoord");


function setWeatherData() {
    btnGeo.disabled = false;
    btnGeo.className = 'enabled';
    const cityOwn = prompt('City name you are looking for: ');
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityOwn}&units=metric&appid=${apiKey}`;

    fetch(urlCity)
        .then(res => res.json())
        .then(data => displayWeatherData(data));

    btnGeo.addEventListener('click', getWeatherData);
};

function goToCoordinates() {
    btnGeo.disabled = false;
    btnGeo.className = 'enabled';
    const latitudeOwn = prompt('Set the latitude: ');
    const longitudeOwn = prompt('Set the longitude: ');
    const urlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeOwn}&lon=${longitudeOwn}&units=metric&appid=${apiKey}`;

    document.getElementById("locationLink").href = `https://openstreetmap.org/#map=12/${lat}/${lon}`;

    fetch(urlCoord)
        .then(res => res.json())
        .then(data => displayWeatherData(data));

    btnGeo.addEventListener('click', getWeatherData);
}
