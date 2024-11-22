const API_KEY = 'c1a2a23379cb4c06a2a153152242211';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

function fetchWeather(location) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${location}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error fetching weather:', error));
};



function getBackgroundImage(temp, condition, windSpeed) {
  // Check for specific weather conditions first
  if (condition.includes('Rain') || condition.includes('Drizzle')) {
    return 'assets/images/rainy.png'; // Rainy weather
  } else if (condition.includes('Snow')) {
    return 'assets/images/snowy.png'; // Snowy weather
  } else if (condition.includes('Thunderstorm')) {
    return 'assets/images/stormy.png'; // Thunderstorm
  } else if (condition.includes('Cloud') || condition.includes('Overcast')) {
    return 'assets/images/cloudy.png'; // Cloudy weather
  } else if (condition.includes('Clear')) {
    return 'assets/images/sunny.png'; // Clear or sunny weather
  }

  // Consider wind speed for windy conditions
  if (windSpeed > 20) {
    return 'assets/images/windy.png'; // Windy weather
  }

  // Use temperature ranges for fallback
  if (temp <= 0) {
    return 'assets/images/freezing.png'; // Freezing temperatures
  } else if (temp > 0 && temp <= 15) {
    return 'assets/images/cold.png'; // Cold weather
  } else if (temp > 15 && temp <= 24) {
    return 'assets/images/mild.png'; // Mild weather
  } else if (temp > 24 && temp <= 35) {
    return 'assets/images/warm.png'; // Warm weather
  } else if (temp > 35) {
    return 'assets/images/hot.png'; // Hot weather
  }

  // Default fallback
  return 'assets/images/cloud.png';
};





function displayWeather(data) {
  const weather = data.current;
  document.getElementById('js-outpost-temp').innerHTML = `
    ${weather.temp_c}°C
  `;
  document.getElementById('js-outpost-country').innerHTML = `
    ${data.location.name}
  `;
  document.getElementById('js-outpost-condition').innerHTML = `
    ${weather.condition.text}
  `;
  document.getElementById('js-output-humid').innerHTML = `${weather.humidity}%
  `;
  document.getElementById('js-output-wind').innerHTML = `${weather.wind_kph} km/h
  `;


  
  /**
   * const imageUrl = `https:${weather.condition.icon}`; // Ensure the full URL
  document.getElementById('js-outpost-image').style.backgroundImage = `url('${imageUrl}')`;
  document.getElementById('js-outpost-image').style.backgroundSize = "cover"; // Optional: ensures the image covers the element
  document.getElementById('js-outpost-image').style.backgroundPosition = "center"; // Optional: centers the image***/



  // Update UI with temperature and conditions
  
  

  // Get appropriate background image
  const backgroundImage = getBackgroundImage(
    weather.temp_c,
    weather.condition.text,
    weather.wind_kph // Replace with wind_mph if using mph
  );

  // Set background image dynamically
  const previewDiv = document.getElementById('js-outpost-image');
  previewDiv.style.backgroundImage = `url('${backgroundImage}')`;
  previewDiv.style.backgroundSize = 'cover';
  previewDiv.style.backgroundPosition = 'center';
};



/* function displayWeather(data) {
  const weather = data.current;
  document.getElementById('js-outpost-temp').innerHTML = `
    <h2>${data.location.name}</h2>
    <p>Temperature: ${weather.temp_c}°C</p>
    <p>Condition: ${weather.condition.text}</p>
    <img src="${weather.condition.icon}" alt="Weather Icon">
  `;
}; */


document.getElementById('locationInput').addEventListener('change', () => {
  const location = document.getElementById('locationInput').value; // Get the selected country
  if (location) {
    fetchWeather(location); // Call the function only if a country is selected
  } else {
    document.getElementById('output').innerHTML = 'Please select a valid country.';
  }
});


