const request = require('request');

const geoCode = (address, callback) => {
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9kZWpzYmhhaSIsImEiOiJja2szcHNmYzUwNWI2Mm9vZDNzcG56OGM2In0.VMz_Q8kCC2Jqu0NtnCw2UQ&limit=1';

    request({url: geoCodeURL, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the geocoding services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location! try again with different search term.', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;