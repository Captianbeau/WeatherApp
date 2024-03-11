// TODO fetch weather data, sort it by:temp, conditions, cloud coverage, location. 
// TODO use inputs to get the data for specific cities  maybe(use the city data to make an auto-correct)
// TODO eventListeners for buttons and add buttons for previous cities
// TODO local storage for previously searched cities
const forecastArea = document.querySelector('#forecast')
// needs lat and lon to get good location
const searchBtn= document.querySelector('#searchBtn');
const APIKey = "f83cd6c573bb9467dfb73fbb0a6f5d02";


function printForecast(resultData){
    //date temp, conditions, cloud-coverage
    const forecastDay = document.createElement('div');
    forecastDay.classList.add('list-body');

    const date = document.createElement('h4');
    // date.textContent = dayjs(resultData.dt).format('ddd, D');
    date.textContent = 'A'

    const temp = document.createElement('h3');
    temp.textContent = resultData.main.temp + 'F High '+ resultData.main.temp_min + 'F Low';

    const conditions = document.createElement('h5');
    conditions.textContent = resultData.weather[0].main;

    const cloudCoverage = document.createElement('h5');
    cloudCoverage.textContent = resultData.weather[0].description + ' '+ resultData.clouds.all+'% coverage';

    forecastDay.append(date,temp,conditions,cloudCoverage);

    forecastArea.append(forecastDay)
console.log (resultData.dt)
}


function weatherCall(event){
    event.preventDefault();

    const city = document.querySelector('#search').value;
    const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${APIKey}&units=imperial`;
    
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
            for(var i = 0; i< data.list.length; i++){
                printForecast(data.list[i]);
            }
         }
            console.log(data);
            
        });


};

searchBtn.addEventListener('click', weatherCall);