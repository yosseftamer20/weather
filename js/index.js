// today vars
let todayName = document.getElementById('todayName');
let todayNum = document.getElementById('todayNum');
let todayMonth = document.getElementById('todayMonth');
let todayCity = document.getElementById('todayCity');
let todayTemp = document.getElementById('todayTemp');
let todayConditionImg = document.getElementById('todayConditionImg');
let todayConditionText = document.getElementById('todayConditionText');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDir = document.getElementById('windDir');
// --------------------------------------------------------------------------

// tomorrow vars
let tomorrowName = document.getElementById('tomorrowName');
let nextMaxTemp = document.getElementById('tomorrowMaxTemp');
let nextMinTemp = document.getElementById('tomorrowMinTemp');
let tomorrowConditionIcon = document.getElementById('tomorrowConditionIcon');
let tomorrowConditionText = document.getElementById('tomorrowConditionText');
// --------------------------------------------------------------------------

// after tomorrow vars
let afterTomorrowName = document.getElementById('afterTomorrowName');
let afterTomorrowMaxTemp = document.getElementById('afterTomorrowMaxTemp');
let afterTomorrowMinTemp = document.getElementById('afterTomorrowMinTemp');
let afterTomorrowConditionIcon = document.getElementById('afterTomorrowConditionIcon');
let afterTomorrowConditionText = document.getElementById('afterTomorrowConditionText');
// --------------------------------------------------------------------------

// saerch vars
let saerch = document.getElementById('saerch');
// --------------------------------------------------------------------------

// API DATA
async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json();
    return weatherData
}
// --------------------------------------------------------------------------

// today section 
function displayTodayData(data) {
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString('en-US', { weekday: "long" })
    todayNum.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-US', { month: "long" })
    todayCity.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute('src', data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_kph
    windDir.innerHTML = data.current.wind_dir
}
// --------------------------------------------------------------------------


// tomorrow section 
function displayTomorrowData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i].date);
        tomorrowName.innerHTML = nextDate.toLocaleDateString('en-US', { weekday: "long" })
        nextMaxTemp.innerHTML = forecastData[i].day.maxtemp_c;
        nextMinTemp.innerHTML = forecastData[i].day.mintemp_c;
        tomorrowConditionIcon.setAttribute('src', forecastData[i].day.condition.icon);
        tomorrowConditionText.innerHTML = forecastData[i].day.condition.text;
    }
}
// --------------------------------------------------------------------------

// after tomorrow section 
function displayAfterTomorrowData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let afterNextDate = new Date(forecastData[i + 1].date);
        afterTomorrowName.innerHTML = afterNextDate.toLocaleDateString('en-US', { weekday: "long" })
        afterTomorrowMaxTemp.innerHTML = forecastData[i + 1].day.maxtemp_c;
        afterTomorrowMinTemp.innerHTML = forecastData[i + 1].day.mintemp_c;
        afterTomorrowConditionIcon.setAttribute('src', forecastData[i + 1].day.condition.icon);
        afterTomorrowConditionText.innerHTML = forecastData[i + 1].day.condition.text;
    }
}
// --------------------------------------------------------------------------

// RUN APP
async function runApp(city='cairo') {
    let weatherData = await getWeatherData(city);
    displayTodayData(weatherData);
    displayTomorrowData(weatherData);
    displayAfterTomorrowData(weatherData);
}
runApp();
// --------------------------------------------------------------------------

// saerch section
saerch.addEventListener('input', function () {
    runApp(saerch.value)
})