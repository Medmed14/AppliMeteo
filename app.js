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

    const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip)

    //2.on recupere la ville grace a l'ip
        
    ville = await fetch('http://api.ipstack.com/'+ip+'?access_key=7f92e7524067397cc08f2c716ac34b9c&format=1')
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
   const name = data.name;
   const temperature = data.main.temp;
   const conditions = data.weather[0].main;
   const description = data.weather[0].description;

   document.querySelector('#ville').textContent = name;
   document.querySelector('#temperature').textContent = Math.round(temperature);
   document.querySelector('#conditions').textContent = capitalize(description);
   document.querySelector('i.wi').className = weatherIcons[conditions];
   document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', ()=>{
    ville.contentEditable = true;
});

ville.addEventListener('keydown',(e) => {
    if(e.keycode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})
main();