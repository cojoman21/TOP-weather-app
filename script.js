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

  console.log(data.currentConditions);
}

getWeather("Bucharest", "metric").catch(console.error);
getWeather("Bucharest", "us").catch(console.error);
