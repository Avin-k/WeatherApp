// const container = getElementsByClassName(container);
// const search = getElementsByClassName(search-box);
// const error = getElementsByClassName(error);
// const weatherBox = getElementsByClassName(weather-box);
// const weatherDetail = getElementsByClassName(weather-detail);

const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const error = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const key = `79235a508f9fb0b5811d732d6a0c103a`;
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
        .then((response) => response.json())
        .then((json) => {

            // console.log(json) to check JSON File

            if (json.cod === '404') {
                container.style.height = '400px';
                container.style.overflow = 'visible';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fade-in')
                return;
            }
            error.style.display = 'none';

            const img = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windSpeed = document.querySelector('.weather-details .wind-speed span');

            switch (json.weather[0].main) {
                case 'Clear':
                    img.src = '/newJava/weatherApp/img/clear.png';
                    break;
                case 'Clouds':
                    img.src = '/newJava/weatherApp/img/cloud.png';
                    break;
                case 'Haze':
                    img.src = '/newJava/weatherApp/img/mist.png';
                    break;
                case 'Rain':
                    img.src = '/newJava/weatherApp/img/rain.png';
                    break;
                case 'Snow':
                    img.src = '/newJava/weatherApp/img/snow.png';
                    break;

                default:
                    img.src = '';
                    break;
            }

            temperature.innerHTML = `${json.main.temp}<span>&degC<span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windSpeed.innerHTML = `${json.wind.speed} Km/h`;

            container.style.height = '505px';
            container.style.overflow ='visible';
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');

        }
        )

})