const form = document.querySelector("form");
const weatherDiv = document.querySelector(".weather-display");
const locationPara = weatherDiv.querySelector(".weather-location");
const conditionsPara = weatherDiv.querySelector(".weather-conditions");
const degreesPara = weatherDiv.querySelector(".weather-degrees");
const toggleUnitsBtn = weatherDiv.querySelector(".toggle-units");

const loadingSVG = `<svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle></svg>`;

const formLocation = form.querySelector("#location").value;

let degreesCelsiusValue;
let degreesFahrenheitValue;

toggleUnitsBtn.textContent = "Celsius";

toggleUnitsBtn.addEventListener("click", (e) => {
  if (e.target.innerText === "Celsius") {
    e.target.innerText = "Fahrenheit";
    degreesPara.textContent = degreesFahrenheitValue + "°";
  } else {
    e.target.innerText = "Celsius";
    degreesPara.textContent = degreesCelsiusValue + "°";
  }
});

async function getWeather(location) {
  const url =
    "https://weather.visualcrossing.com/" +
    "VisualCrossingWebServices/rest/services/timeline/" +
    `${location}?unitGroup=metric&include=current`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);

  return data;
}

async function extractData(location) {
  const weatherData = await getWeather(location);

  const data = {
    location: weatherData.resolvedAddress,
    temperature: weatherData.currentConditions.temp,
    conditions: weatherData.currentConditions.conditions,
  };

  degreesCelsiusValue = data.temperature;
  degreesFahrenheitValue = celsiusToFahrenheit(degreesCelsiusValue);

  console.log(data);
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const locationValue = e.target.querySelector("#location").value;
  const location =
    locationValue.charAt(0).toUpperCase() + locationValue.slice(1);

  console.log(location);

  displayWeather(location);
});

function celsiusToFahrenheit(degreesCelsius) {
  const degreesFahrenheit = degreesCelsius * 1.8 + 32;
  return (Math.round(degreesFahrenheit * 100) / 100).toFixed(1);
}

async function displayWeather(location) {
  locationPara.innerHTML = "";
  degreesPara.innerHTML = "";

  conditionsPara.innerHTML = loadingSVG;
  const weatherData = await extractData(location);

  locationPara.textContent = weatherData.location;
  conditionsPara.textContent = weatherData.conditions;

  if (toggleUnitsBtn.textContent === "Celsius") {
    degreesPara.textContent = degreesCelsiusValue + "°";
  } else {
    degreesPara.textContent = degreesFahrenheitValue + "°";
  }

  weatherDiv.style.backgroundColor = temperatureBgCol(degreesCelsiusValue);

  weatherDiv.style.display = "grid";
}

function temperatureBgCol(celsiusValue) {
  if (celsiusValue <= 0) {
    return "#00bdbd";
  } else if (celsiusValue <= 5) {
    return "#64c46c";
  } else if (celsiusValue <= 15) {
    return "#96d600";
  } else {
    return "#ff9100";
  }
}
