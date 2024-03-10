// TODO fetch weather data, sort it by:temp, conditions, cloud coverage, location. 
// TODO use inputs to get the data for specific cities  maybe(use the city data to make an auto-correct)
// TODO eventListeners for buttons and add buttons for previous cities
// TODO local storage for previously searched cities

// needs lat and lon to get good location
const searchBtn= document.querySelector('#searchBtn');
const APIKey = "f83cd6c573bb9467dfb73fbb0a6f5d02";





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
         }
            console.log(data);
            
        });


};

searchBtn.addEventListener('click', weatherCall);