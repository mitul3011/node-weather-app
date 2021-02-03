// Path is a core node module to manipulate path strings.
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const viewsPath = path.join(__dirname, '../templates/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mitul Vaiyata'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mitul Vaiyata'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Mitul Vaiyata',
        helpText: 'This is some helpful text.'
    });
});

// Now to in URL we pass query on which we have to give results to user, so we get all queries on req object of the app.get() function.

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address/Location!'
        });
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Mitul Vaiyata',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Mitul Vaiyata',
        errorMessage: 'Page not found!'
    });
});

// We have started server on port 3000 which is common port for development.
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
