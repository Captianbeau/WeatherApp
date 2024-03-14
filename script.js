// TODO fetch weather data, sort it by:temp, conditions, cloud coverage, location. 
// TODO use inputs to get the data for specific cities  maybe(use the city data to make an auto-correct)
// TODO eventListeners for buttons and add buttons for previous cities
// TODO local storage for previously searched cities
const forecastArea = document.querySelector('.dailyweather')
// needs lat and lon to get good location
const searchBtn= document.querySelector('#searchBtn');
const APIKey = "f83cd6c573bb9467dfb73fbb0a6f5d02";

//need to make it so that if there is already a search then it repopulated with the data(like hidden display or check for class)
let city;

function printForecast(resultData){
    //date temp, conditions, cloud-coverage
    const forecastDay = document.createElement('div');
    forecastDay.classList.add('list-body');

    const tempDiv = document.createElement('div');
    const forecastBody = document.createElement('div');
    

    
// if(dayjs(resultData.dt_txt).format('h') === '12'){
//     console.log(resultData)


if(resultData.sys.pod === 'n'){
    // const date = document.createElement('h4');
    // date.textContent = dayjs(resultData.dt_txt).format('ddd D')+ " Night";
    const tempNight = document.createElement('h3');
    tempNight.textContent = resultData.main.temp_min + 'F Low';
    tempNight.classList.add('tempNight');

    const conditionsNight = document.createElement('p');
    conditionsNight.textContent = 'Night conditions: '+ resultData.weather[0].main +', '+ resultData.weather[0].description;
    forecastDay.classList.add('night')
    tempDiv.append( tempNight)
    forecastBody.append(conditionsNight);


}else{

    const date = document.createElement('h4');
    date.textContent = dayjs(resultData.dt_txt).format('ddd D')+ " ";

    const temp = document.createElement('h3');
    temp.textContent = resultData.main.temp + 'F High ';

    const conditions = document.createElement('p');
    conditions.textContent = resultData.weather[0].main +':' ;

    const cloudCoverage = document.createElement('p');
    cloudCoverage.textContent = resultData.weather[0].description + ' '+ resultData.clouds.all+'% coverage';
    forecastDay.classList.add('day')
    tempDiv.append(date,temp)
    forecastBody.append(conditions,cloudCoverage);
}

    
forecastDay.append(tempDiv,forecastBody)
    forecastArea.append(forecastDay)


    const weatherData = resultData;
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
}

// }

function searchQuery(event){
    event.preventDefault();
    city = document.querySelector('#search').value;
    weatherCall(city);
}
function previousCity(){
    city = JSON.parse(localStorage.getItem('searchedCities'));
    weatherCall(city);
}

function weatherCall(city){
   

    const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
    
   if(!city){
    console.error('need city input');
    return;
   } 
    
      fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
         if(!data){
            console.log('no results');
            //html message City not found
         }else{
            localStorage.setItem('searchedCities', JSON.stringify(data.city.name));
            for(var i = 0; i< data.list.length; i++){
            if(dayjs(data.list[i].dt_txt).format('h') === '12'){
                printForecast(data.list[i]);
                console.log(data.list)
            }
                
            }
            
           
         }
            console.log(data);
            
        });


};

function displayPrevious(){
const lastSearchCity = JSON.parse(localStorage.getItem('searchedCities'));

// console.log(lastSearchCity, lastSearchWeather)
}
displayPrevious()
searchBtn.addEventListener('click', searchQuery);