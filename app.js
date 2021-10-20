const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Thunderstorm": "wi wi-day-thunderstorm",

}


function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}


async function main(withIP = true){
   
    let ville;

    if(withIP){
    // 1. recuperer l'adresse IP du pc qui ouvre la page
    // ip info s'en charge
    //2.on recupere la ville grace a l'ip
        
    ville = await fetch("https://ipinfo.io/json?token=eab636c8692b65")
            .then(resultat => resultat.json())
            .then(json => json.city)
    }else{
        ville = document.querySelector('#ville').textContent;
    }
    //3. on recupere les infos meteo associes a la ville

    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=e88fb590fb713c1470b1bc360adc3115&lang=fr&units=metric`)
            .then(resultat => resultat.json())
            .then(json => json)

//4 afficher les infos sur notre index
displayWeatherInfos(meteo)

}

function displayWeatherInfos(data){
    
   let unix_timestamp_sunrise = data.sys.sunrise;
   let unix_timestamp_sunset = data.sys.sunset;
   var date_sunrise = new Date(unix_timestamp_sunrise * 1000);
   var date_sunset = new Date(unix_timestamp_sunset * 1000);
   var hour_sunrise = date_sunrise.getHours();
   var hour_sunset = date_sunset.getHours();
   var minutes_sunrise = "0" + date_sunset.getMinutes();
   var minutes_sunset = "0" + date_sunrise.getMinutes();
   var formattedTimeSunrise = hour_sunrise + ' h ' + minutes_sunrise.substr(-2) + ' min ';
   var formattedTimeSunset = hour_sunset + ' h ' + minutes_sunset.substr(-2) + ' min ';
  
   const name = data.name;
   const temperature = data.main.temp;
   const ressenti = data.main.feels_like;
   const humidity = data.main.humidity;
   const conditions = data.weather[0].main;
   const description = data.weather[0].description;
   document.querySelector('#ville').textContent = name;
   document.querySelector('#temperature').textContent = Math.round(temperature);
   document.querySelector('#conditions').textContent = capitalize(description);
   document.querySelector('#ressenti').textContent = Math.round(ressenti);
   document.querySelector('#humidity').textContent = Math.round(humidity);
   document.querySelector('#hourSunrise').textContent = formattedTimeSunrise;
   document.querySelector('#hourSunset').textContent = formattedTimeSunset;
   document.querySelector('i.wi').className = weatherIcons[conditions];
   document.body.className = conditions.toLowerCase();
   console.log(data)
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

document.querySelector('#ville').addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
});
main();