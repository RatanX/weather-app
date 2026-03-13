const input  = document.querySelector("input")
const button = document.querySelector("button")



button.addEventListener("click",()=>{
    let cityname = (input.value)
     fetchLocation(cityname)
})


async function  fetchLocation(cityname) {

  const url = `https://nominatim.openstreetmap.org/search?q=${cityname}&format=json`;

  const options = {
      headers: {
        'User-Agent': 'WeatherProject/1.0 (govindhkd@rediffmail.com)'
      }}
try {
	const searchResponse = await fetch(url,options);
	const searchResult = await searchResponse.json();
	(searchResult.forEach(element => {
     let latitude = element.lat ;
     let longitude = element.lon ;
    fetchWeather(latitude ,longitude,cityname )
  }));
} catch (error) {
	console.error(error);
}

// const lat = 21.1458;  // New Delhi
// const lon = 79.0882;

 async function fetchWeather(latitude ,longitude, cityname ) { 

  const WeatherResponse =await  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude }&longitude=${longitude }&current_weather=true`)

  const WeatherResult = await WeatherResponse.json()
  
   let data = WeatherResult.current_weather
   
    document.querySelector(".city").innerText=`Hay  ${cityname} `;
   document.querySelector(".temp").innerText=`Temperature : ${data.temperature} °C`;
   document.querySelector(".wind").innerText=`Wind Speed : ${data.windspeed} km/hr`;
   document.querySelector(".weather").innerText=`Wheather : ${data.weathercode}`;
  document.querySelector(".day").innerText=`Currently : ${data.is_day==1? "Day" : "Night"} `;

console.log( cityname,data.temperature ,data.windspeed,data.weathercode,data.is_day)

  }

}




const bgImage = document.querySelector(".bg-image")
bgImage.style.backgroundImage = "url(https://img.goodfon.com/original/1920x1080/6/3e/lights-planet-earth-europe.jpg)"

