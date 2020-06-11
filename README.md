# Catch the train Client

This project is the react frontend of the 'Catch the train' web application. The backend project is also on github: [https://github.com/JulienRobberechts/catch-the-train-server](https://github.com/JulienRobberechts/catch-the-train-server).

The application Catch the train in production: [https://catch-the-train.dev-app.space](https://catch-the-train.dev-app.space) (if deployed)

[![build](https://github.com/JulienRobberechts/catch-the-train-client/workflows/build/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Abuild) [![deploy](https://github.com/JulienRobberechts/catch-the-train-client/workflows/deploy/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Adeploy)

![application 'Attraper le train'](doc/images/attraper%20le%20train-1.png)

## Presentation

This web application is useful when you want to see the next schedule for your train and leave you place at the right time to get your train on time.
You can rely on the application to update the schedule and calculate the right time to leave.

This application only works on RER A in France for now. (some update will extend station soon to other RER and trains).

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
