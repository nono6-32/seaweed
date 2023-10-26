// 天気アイコンを設定する関数
function setWeatherIcon(weatherCode) {
    const weatherImgElement = document.getElementById("weather");
    let iconPath;

    switch (weatherCode) {
        case 1:
            iconPath = "assets/images/weather/sunny.png";
            break;
        case 2:
        case 3:
            iconPath = "assets/images/weather/cloudy.png";
            break;
        case 4:
            iconPath = "assets/images/weather/rainy.png";
            break;
        case 5:
            iconPath = "assets/images/weather/snowy.png";
            break;
        case 9:
            iconPath = "assets/images/weather/thunder.png";
            break;
        default:
            iconPath = "assets/images/weather/sunny.png";
            break;
    }

    weatherImgElement.src = iconPath;
}

// APIからデータを取得
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
        setWeatherIcon(weatherCode);
    })
    .catch(error => {
        console.log('Fetch error:', error);
    });
