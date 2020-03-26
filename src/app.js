window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature-section');
    let humiditySection = document.querySelector('.humidity-section');
    let windSection = document.querySelector('.windSpeed-section');


    const temperatureSpan = document.querySelector('.temperature-section');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy ="https://cors-anywhere.herokuapp.com/";
        const api= `${proxy}https://api.darksky.net/forecast/0a83abb2e48eb85d6c56666ff63d1fc4/${lat},${long}`;
        fetch(api)
            .then(response =>{
                return  response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon, humidity, windSpeed}= data.currently;

                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                humiditySection.textContent = humidity*100 + " %";
                windSection.textContent = windSpeed + " km/h";
                locationTimezone.textContent = data.timezone;

                //Formula for Celsius
                let celsius = (temperature-32)*(5/9);
                temperatureDegree.textContent = Math.floor(celsius) + " C";
                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Change temperature to Celsius/Farenheit
                /* temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === 'C'){
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                        
                    }else{
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                        
                    }
                }) */

            });
        });      

    }else{
        h1.textContent ="Geolocation does not work"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon= icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});