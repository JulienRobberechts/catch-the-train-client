# Catch the train (Front End)

[![application 'Attraper le train'](doc/images/attraper%20le%20train-1.png)](https://catch-the-train.dev-app.space)

This project is the react frontend of the 'Catch the train' web application. The backend project is also on github: [https://github.com/JulienRobberechts/catch-the-train-server](https://github.com/JulienRobberechts/catch-the-train-server).

The application Catch the train in production: [https://catch-the-train.dev-app.space](https://catch-the-train.dev-app.space) (if deployed)

[![build](https://github.com/JulienRobberechts/catch-the-train-client/workflows/build/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Abuild) [![deploy](https://github.com/JulienRobberechts/catch-the-train-client/workflows/deploy/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Adeploy)

## How many times did you get to the station only to miss the train by 1 minute? Never again with this handy application!

### It will help you catch your train by indicating the best time to set off, based on the duration of your journey to the station and the live departure board. You can even plan time for a coffee!

### "rien ne sert de courir il faut partir à point"

This application only works on RER A in France for now. (more train lines will be added in future versions).

[![application 'Attraper le train'](doc/images/attraper%20le%20train-gif-1.gif)](https://catch-the-train.dev-app.space)

## Setup for Development

### Install

> npm i

### Start

To start the application locally for dev or test:

> npm start

### Test

To run tests:

> npm test

#### manual tests

- Open a browser at: ['http://localhost:3025/']('http://localhost:3025/').

### Local dev

You can create an .env.development.local file at the root to override the .env values with those values:

```env
PORT=3025
REACT_APP_SERVER_ROOT_URL=http://localhost:3034
REACT_APP_MOCK_TIME=true
REACT_APP_DISABLE_TIME_UPDATE=true
REACT_APP_MAPBOX_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXX
```

### Deployment

[Instructions for the deployment of the front-end on AWS S3 + TLS + CDN](./doc/deploy.md)
