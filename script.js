// TODO fetch weather data, sort it by:temp, conditions, cloud coverage, location. 
// TODO use inputs to get the data for specific cities  maybe(use the city data to make an auto-correct)
// TODO eventListeners for buttons and add buttons for previous cities
// TODO local storage for previously searched cities

const dayForecast = document.querySelector('.day');
const nightForecast = document.querySelector('.night');
const cityTitle = document.querySelector('#cityTitle');
const date = document.querySelector('.date')
const searchBtn = document.querySelector('#searchBtn');
const cityBtnArea = document.querySelector('.prevBtns');

const APIKey = "f83cd6c573bb9467dfb73fbb0a6f5d02";


let city;
let weatherStatus;


//event listeners
searchBtn.addEventListener('click', searchQuery);
cityBtnArea.addEventListener('click', previousCity);

//function calls
cityButtons()

//printForecast (sets creates the element display)
function printForecast(resultData) {

    const forecast = document.createElement('div');
    forecast.classList.add('list-body');

    const forecastBody = document.createElement('div');

    if (resultData.sys.pod === 'n') {


        const tempNight = document.createElement('h3');
        tempNight.textContent = resultData.main.temp_min + 'F Low';
        tempNight.classList.add('tempNight');

        const conditionsNight = document.createElement('p');
        conditionsNight.textContent = 'Night conditions: ' + resultData.weather[0].main + ', ' + resultData.weather[0].description;

        

        forecast.append(tempNight,conditionsNight)
        nightForecast.append(forecast);

    } else {
        const date = document.createElement('h4');
        date.classList.add('date')
        date.textContent = dayjs(resultData.dt_txt).format('ddd D') + " ";


        const temp = document.createElement('h3');
        temp.textContent = resultData.main.temp + 'F High ';

        const conditions = document.createElement('p');
        conditions.textContent = resultData.weather[0].main + ':';

        const cloudCoverage = document.createElement('p');
        cloudCoverage.textContent = resultData.weather[0].description + ' ' + resultData.clouds.all + '% coverage';


        forecastBody.append(conditions, cloudCoverage);
        forecast.append(date,temp,forecastBody)
        dayForecast.append(forecast);
    }

}
//printForecast end

//Search functions set the city name for the query
//searchQuery (handles the search input event)
function searchQuery(event) {
    event.preventDefault();

    city = document.querySelector('#search').value;
    weatherStatus = 'search'
    weatherCall(city, weatherStatus);
}
//searchQuery end

//previousCity (handles the previous city searches button events)
function previousCity(event) {

    city = event.target.textContent;
    weatherStatus = 'prev'
    weatherCall(city);

}
//previousCity end

//weatherCall (fetches the query and sets up the html to receive data)
function weatherCall(city, weatherStatus) {

    const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

    if (!city) {
        console.error('need city input');
        return;
    }

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data) {

                console.log('no results');
                cityTitle.textContent = 'City Not Found'
                
            } else {

                //saves the city name
                if (weatherStatus === 'search') {

                    saveCities(data.city.name)

                    cityBtnArea.innerHTML = '';
                    cityButtons();

                }

                //sets up the html
                dayForecast.innerHTMl= '';
                nightForecast.innerHTML = '';


                //sets the title text content
                cityTitle.textContent = data.city.name;

                //sorts the data
                for (let i = 0; i < data.list.length; i++) {

                    if (dayjs(data.list[i].dt_txt).format('h') === '12') {

                        printForecast(data.list[i]);
                    }

                }

            }

        });


};
//weatherCall ends

//saveCities function
function saveCities(cityName) {
    console.log(cityName)

     const savedCities = JSON.parse(localStorage.getItem('searchedCities'))||[];

    if (savedCities == null) {
        localStorage.setItem('searchedCities', JSON.stringify(cityName));
    }

    savedCities.push(cityName);

    localStorage.setItem('searchedCities', JSON.stringify(savedCities));
}
//saveCities function end

//cityButtons function
function cityButtons() {

    const previous = JSON.parse(localStorage.getItem('searchedCities')) || [];

    if (previous !== null) {
        for (let i = 0; i < previous.length; i++) {

            const prevButton = document.createElement('button');
            prevButton.classList.add('prevCity')
            prevButton.textContent = previous[i];

            cityBtnArea.append(prevButton);
        }
    }
}
//cityButtons end

//displayPrevious
function displayPrevious() {



}
//displayPrevious end
