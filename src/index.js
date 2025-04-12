const API_KEY ="7c7eb654221b0e697be87203535ac15c";
const API_URL ="https://api.openweathermap.org/data/2.5/weather?units=metric";
const submit = document.querySelector('#search-btn');
const ICON_URL = "https://openweathermap.org/img/wn/";
submit.addEventListener('click',e=>{
    let cityname = cityNameValidator(document.querySelector('#search').value);
    if(cityname.length){
        fetchWeather(cityname);
    }
});
document.addEventListener('keypress',e=>{
    if(e.key === 'Enter'){
        let cityname = cityNameValidator(document.querySelector('#search').value);
        if(cityname.length){
            fetchWeather(cityname);
        }
    }
})
function cityNameValidator(cityName){
    const isWhitespaceString = str => !str.replace(/\s/g, '').length
    if(!isWhitespaceString(cityName.trim()))
        return cityName.trim();
    return '';
}
async function fetchWeather(cityName) {
    const request = await fetch(API_URL+`&appid=${API_KEY}&q=${cityName}`);
    const response = await request.json();
    console.log(response);
    if(!response.message){
        let icon = document.getElementById('state');
        icon.src = `${ICON_URL}${response.weather[0].icon}@4x.png`;
        icon.hidden = false;
        document.getElementById('waether-disc').textContent = response.weather[0].description;
        document.getElementById('cityName').textContent = response.name+`, ${response.sys.country}`;
        document.getElementById('degree').textContent = response.main.temp + '°C';
        document.querySelector('#humidity-icon').src = '../images/humidity.png';
        document.querySelector('#humidity-icon').hidden=false;
        document.querySelector('#wind-icon').src='../images/windspeed.png';
        document.querySelector('#wind-icon').hidden=false;
        document.querySelector('#humidity').textContent = "humidity";
        document.querySelector('#wind').textContent = "Wind speed";
        document.querySelector('#humidity-data').textContent = response.main.humidity + "%";
        document.querySelector('#speed-data').textContent = response.wind.speed + "km/h";
    }else{
        document.getElementById('cityName').textContent = 'City Not Found!';
        document.getElementById('cityName').style.fontSize = "4rem";
        
    }
}
