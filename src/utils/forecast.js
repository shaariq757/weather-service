const request = require("request");

const foreCast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2da98a64ce348eecce2ccf0c90f9cea7&query=" +lat + "," + long + "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        desc: body.current.weather_descriptions[0],
        temp: body.current.temperature,
        feels: body.current.feelslike,
        precip: body.current.precip,
      });
    }
  });
};

module.exports = foreCast;
