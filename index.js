const apiKey = "fc405a917ae4dec2a5f6fa6f778ed3fb";
const city = document.querySelector('#city');
const country = document.querySelector('#country');
const btn = document.querySelector('#getWeather');


const getData = async () => {
    const countryName = country.value;
    const cityName = city.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${apiKey}`;
    const request = await fetch(apiUrl);
    const response = await request.json();
    displayWeather(response);
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    getData();
})

function roundNum(num) {
    return Math.round(num * 100) / 100;
}

function displayWeather(response) {
    const { temp, temp_max: max, temp_min: min } = response.main;
    const { description, icon } = response.weather[0];
    const imgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const main = document.querySelector('main');
    main.innerHTML = `
    <div class ="currentTarget">
        <h1 class="currentTarget__name">${city.value},${country.value}</h1>
        <img src = "${imgSrc}" alt ="Weather Icon"/>
        <h2 class ="currentTarget__temperature">
        ${Math.round(temp - 273.15)}°</h2>
        <div class ="currentTarget__min-max">
        <h3>${Math.round(min - 273.15)}°</h3>
        <h3>${Math.round(max - 273.15)}°</h3>
        </div>
        <strong class ="currentTarget__weather">
        ${description}</strong>
    </div>
    `
    city.value = '';
    country.value = '';
}



