const form = document.querySelector("form");

async function getWeather(location, units) {
  const url =
    "https://weather.visualcrossing.com/" +
    "VisualCrossingWebServices/rest/services/timeline/" +
    `${location}?unitGroup=${units}&include=current`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);

  return data;
}

async function extractData(location, units) {
  const weatherData = await getWeather(location, units);

  const data = {
    location: weatherData.resolvedAddress,
    temperature: weatherData.currentConditions.temp,
    conditions: weatherData.currentConditions.conditions,
  };

  console.log(data);
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = e.target.querySelector("#location").value;
  const units = e.target.querySelector("#units").value;

  console.log(location);
  console.log(units);

  const weatherData = await extractData(location, units);
  console.log(weatherData);
});
