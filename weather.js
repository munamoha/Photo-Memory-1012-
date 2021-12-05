function weather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Toronto,CA&appid=de38ff2a15bf7002cea429345d856fc8')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    findWeather(data);
  })
  .catch(function() {
    // catch any errors
  });
}
window.onload = function() {
    weather(6167865);
  }

  function findWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);	
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
}
