var ClozeCard = function (text, cloze){
	if (!text.includes(cloze)) {
		console.log(text + ", " + cloze + ".");
	} else {
		this.cloze = cloze;
		this.partial = text.replace(cloze, '______________');
		this.fullText = text;
	}
};

module.exports = ClozeCard;

	this.getWeather = function(city){
		weather.find({
			search: city, 
			degreeType: 'F'
		}, function(error, result) {
		  if(error) {
		  	console.log(error);
		  }
		  var location = result[0].location;
		  var currentWeather = result[0].current;
		  var forcast = result[0].forecast;
		  console.log(`The current weather for ${location.name} is ${currentWeather.temperature}°F. It is ${currentWeather.skytext}.`);
		  console.log(JSON.stringify(result, null, 2));
		});
	};