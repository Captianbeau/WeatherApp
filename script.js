// TODO fetch weather data, sort it by:temp, conditions, cloud coverage, location. 
// TODO use inputs to get the data for specific cities  maybe(use the city data to make an auto-correct)
// TODO eventListeners for buttons and add buttons for previous cities
// TODO local storage for previously searched cities
const APIKey = "f83cd6c573bb9467dfb73fbb0a6f5d02";

let city;

const requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;


fetch(requestUrl)
    .then(function (response){
        return response.json();
    })