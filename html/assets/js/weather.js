
const apiUrl = 'https://api.open-meteo.com/v1/forecast?longitude=139.485&latitude=35.396&timezone=Asia%2FTokyo&daily=weathercode';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.daily.weathercode[0]);
        const weatherCode = data.daily.weathercode[0];

        const weatherImgElement = document.getElementById("weather");
        console.log(weatherImgElement);

        switch (weatherCode) {
            case 1:
                weatherImgElement.src = "assets/images/weather/sunny.png";
                break;
            case 2:
                weatherImgElement.src = "assets/images/weather/cloudy.png";
                break;
            case 3:
                weatherImgElement.src = "assets/images/weather/cloudy.png";
                break;
            case 4:
                weatherImgElement.src = "assets/images/weather/rainy.png";
                break;
            case 5:
                weatherImgElement.src = "assets/images/weather/snowy.png";
                break;
            case 9:
                weatherImgElement.src = "assets/images/weather/thunder.png";
                break;
            default:
                weatherImgElement.src = "assets/images/weather/sunny.png";
                break;
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);
    })