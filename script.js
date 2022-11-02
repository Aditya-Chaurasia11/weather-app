const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`

    // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const form = document.querySelector("form")
    const search = document.querySelector("#search")
    const weather = document.querySelector("#weather")
    const loc = document.getElementById('location');

    const getweather = async (city)=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        const response = await fetch(url);
        const data = await response.json()
        // console.log(data);
        return showweather(data);

        
    }
    const getLocWeather = async(lat,lon)=>{
        const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const respo = await fetch(url1);
        const data2 = await respo.json();
        // console.log(data2);
        return showweather(data2);

    }
    const showweather = (data)=>{
        if(data.cod == "404"){
            weather.innerHTML = `<h2> City not found</h2>`
            return; 
        }
       
        weather.innerHTML = `
        <div class="image" >
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="image">
        </div>
        <div class="temp">
            <h2>${data.main.temp}°C</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
        `
    }
    loc.addEventListener(
        "click",
        function getLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
            } else {
              weather.innerHTML = "Geolocation is not supported.";
            }
          }

    )
    function showPosition(position) {
        const lat = position.coords.latitude ;
        const lon =  position.coords.longitude;
        console.log(lat,lon);
        return getLocWeather(lat,lon);
      }
    form.addEventListener(
        "submit",
        function(event){
           getweather(search.value)
            event.preventDefault();  //form ka reload hona ruka dega
        }
    )