const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef1ef2cf4166358984612f6144ba8e6a&query=' + latitude + ',' + longitude + '&units=m';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '
            + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. UV index is '
            + body.current.uv_index + '. Wind Speed is ' + body.current.wind_speed + ' Kmph currently.');
        }
    });
};

module.exports = forecast;