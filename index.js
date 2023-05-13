const btn = document.querySelector("#btn");
const searchText = document.querySelector("#searchBar");
const searchRst = document.querySelector(".weather_info");
const cityName = document.querySelector(".cityname");
const currTemp = document.querySelector(".temp");
const forecast = document.querySelector(".weather");
const wind = document.querySelector(".windspeed");
const city = document.querySelector(".city");
const recsDesc = document.querySelector(".recsDesc");
const sign = document.querySelector(".sign");
const signIn = document.querySelector(".signin");
const signUp = document.querySelector(".signup");

const appKey = "af5f9c9a2a1d0c99d0af858bc7caa75f";
const latlongurl =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
let inputRst = "";
const googleAppkey = "AIzaSyAGAkqAtdu1fRkR1vkb4itKdS9GwaRuIuk";
const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=Washington&key=${googleAppkey}`;
let weatherData = [];

btn.addEventListener("click", async () => {
  weatherData = await clickSearch();
  weatheInfo(weatherData);
});

signUp.addEventListener("click", async () => {
  window.location.href = "../signUp/signup.html";
});

signIn.addEventListener("click", async () => {
  window.location.href = "../signIn/signin.html";
});

searchText.addEventListener("input", keyPress);
// /127.0.0.1:5500/326-project-repo-team-issues-changhyoshon100/signUp/singup.html 404 (N
const weatheInfo = (data2) => {
  const name = data2.name;
  const temp = data2.main.temp;
  const weather = data2.weather[0].description;
  const windSpeed = data2.wind.speed;
  let recsTemp = "";
  let recsWea = "";
  if (temp < "30") {
    recsTemp = "Jacket";
  } else if (temp >= "30" && temp < "60") {
    recsTemp = "Sweat shirts";
  } else {
    recsTemp = "short sleeve tee";
  }
  if (weather.includes("rain")) {
    recsWea = "Umbrella";
  }

  city.innerHTML = `City of ${name}`;
  cityName.innerHTML = `${name}`;
  currTemp.innerHTML = `${((temp - 273.15) * (9 / 5) + 32).toFixed(2)}F`;
  forecast.innerHTML = `${weather}`;
  wind.innerHTML = `${windSpeed}MPH`;
  recsDesc.innerHTML = `In ${name}, since the temp is ${(
    (temp - 273.15) * (9 / 5) +
    32
  ).toFixed(2)}F, I recommend you to have ${recsTemp}.
  ${recsWea.length !== 0 ? "and do not forget to bring umbrella" : ""}`;
};

function keyPress() {
  inputRst = searchText.value;
}

function clickSearch() {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRst}&key=${googleAppkey}`
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log("Cannot find the location. Check the spell");
    })
    .then((data) => {
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    });
}
