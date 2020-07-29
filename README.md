# Capstone

## About the project

Final project of the Front-End Developer Nanodegree program by Udacity.

## Project requirements

Build build out a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

## Additional information

The technologies involved in this project are: HTML, Sass, JavaScript, Node.js, Express, Webpack, Service workers.

APIs used:

- Geonames to get geolocation data
- Weatherbit to get weather data
- Pixabay to get image data

## Dependencies

`"axios": "^0.19.2", "body-parser": "^1.19.0", "cors": "^2.8.5", "dotenv": "^8.2.0", "express": "^4.17.1"`

## Setting up the API's

You will need credentials for all three API's:
http://www.geonames.org/export/
https://www.weatherbit.io/api
https://pixabay.com/api/docs/

### Environment variables

In the .env file, declare your API keys like this:

`GEONAMES_KEY=_<your Geonames username>_`
`WEATHERBIT_KEY=_<your Weatherbit API key>_`
`PIXABAY_KEY=_<your Pixabay API key>_`
