const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });

    if (resp.ok) {
        const respData = await resp.json();
        console.log(respData);
        addWeatherToPage(respData);
        } else {
            throw new Error('Something went wrong');
        };
};



function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const FeelsLike = KtoC(data.main.feels_like);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
    <div class="text-center h5 p-5 pb-1 container">
    <p class="text-center h3 text-muted">Hi, 👋 Currently ${data.name} Weather is</p>
    <div class="p-4">
        <img  class="" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <div class="font-weight-bold display-1 pt-2">${temp}°C</div>
        <div class=""> <small>${data.weather[0].main}</small></div>
        <div class="text-muted py-3"><strong>Feels like ${FeelsLike}°</strong></div>
    <div class="row justify-content-center">
        <div class="row text-center text-muted p-4 rounded m-2" style="background-color: rgb(240, 240, 240);">
            <small class="font-weight-bold px-2">Humidity</small>
            <small class="px-2">${data.main.humidity}%</small>
        </div>
        <div class="row text-center text-muted p-4 rounded m-2" style="background-color: rgb(240, 240, 240);">
            <small class="font-weight-bold px-2">Wind Speed</small>
            <small class="px-2">${data.wind.speed} Km/h</small>
        </div>
        <div class="row text-center text-muted p-4 rounded m-2" style="background-color: rgb(240, 240, 240);">
            <small class="font-weight-bold px-2">Wind Degree</small>
            <small class="px-2">${data.wind.deg}</small>
        </div>
    </div>
    </div>
</div>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city).catch(error => {
            console.log(error);

            const ErrorMessage = document.createElement("div");
            ErrorMessage.classList.add("ErrorMessage");
            ErrorMessage.innerHTML = `<div class="container text-center">
            <div class="p-4 mx-5">
            <p class="h1">&#128542; <span class="h1 font-weight-bold" style="color: rgb(255, 55, 55)">Oops! Not Found</span></p>
            <div class="p-3 rounded text-muted mt-4" style="background-color: rgb(255, 255, 134);">
                Note : Don't forget to check spelling! Wrong city spelling might not be found.
            </div>
            </div>
        </div>`;
            // cleanup
            main.innerHTML = "";
            main.appendChild(ErrorMessage);
        });
    }
});

var flag = false;
function scrollDown(event){
    if (event.keyCode == 13 && flag == false) {
        window.scrollBy(0, 250);
        flag = true;
     }
}