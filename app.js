window.addEventListener("load", ()=>{
    let long;
    let lat;
    // Main card elements
    let icon=document.querySelector(".icon");
    let temperature=document.querySelector(".temperature");
    let minMax=document.querySelector(".min-max");
    let description=document.querySelector(".description");
    //Forecast elements
    let day=document.querySelectorAll(".day");
    let dayIcon=document.querySelectorAll(".day-icon");
    let forecastDayMax=document.querySelectorAll(".day-max");
    let forecastDayMin=document.querySelectorAll(".day-min");
    //
    let feelsLike=document.querySelector(".feels-like");
    let wind=document.querySelector(".wind");
    let humidity=document.querySelector(".humidity");
    let cloudiness=document.querySelector(".cloudiness")
    let sunrise=document.querySelector(".sunrise")
    let sunset=document.querySelector(".sunset")
    

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

           const proxy = `http://cors-anywhere.herokuapp.com/`;
           const api=`${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely,hourly&appid=83873c9421d1b05a1e1207dd3f8d8909`;

            

            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                console.log(data)
                // Main card data
                const currentIcon=data.current.weather[0].icon;
                const currentTemp=data.current.temp;
                const dayMin=data.daily[0].temp.min;
                const dayMax=data.daily[0].temp.max;
                const currentDescription=capitalizeFirstLetter(data.current.weather[0].description);

                const currentFL=data.current.feels_like;
                const currentWind=data.current.wind_speed;
                const currentHumidity=data.current.humidity;
                const currentCloudiness=data.current.clouds;
                const currentSunR=data.current.sunrise;
                const currentSunS=data.current.sunset;

                //7days forecast
                for(let c=0;c<7;c++){
                   day[c].innerText=weekday[new Date(data.daily[c+1].dt*1000).getDay()];
                   dayIcon[c].innerHTML=`<img src="http://openweathermap.org/img/wn/${data.daily[c+1].weather[0].icon}@2x.png">`;
                   forecastDayMax[c].innerHTML=`${data.daily[c+1].temp.max} &deg;C`;
                   forecastDayMin[c].innerHTML=`${data.daily[c+1].temp.min} &deg;C`;
                }
              
                //Appending main card info
                icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`;
                temperature.innerHTML=`${currentTemp} &deg;C`;
                minMax.innerHTML=`${dayMin} &deg;C / ${dayMax} &deg;C`;
                description.innerText=currentDescription;

                feelsLike.innerHTML=`Feels like: ${currentFL} &deg;C`;
                wind.innerText=`Wind speed: ${Math.floor(currentWind*360)/100} km/h`;
                humidity.innerText=`Humidity: ${currentHumidity} %`;
                cloudiness.innerText=`Clouds: ${currentCloudiness} %`;
                sunrise.innerText=`Sunrise: ${getHourAndMinute(currentSunR*1000)}`;
                sunset.innerText=`Sunset: ${getHourAndMinute(currentSunS*1000)}`;
                console.log(typeof currentSunS)
               

               
            })

        });

    }
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


function getHourAndMinute(StrDate){
    let date=new Date(StrDate);
    
    return `${toDoubleDigit(date.getHours())}h${toDoubleDigit(date.getMinutes())}`;
}

function toDoubleDigit(n){
    return n > 9 ? "" + n: "0" + n;
}

console.log("loaded")
