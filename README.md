# Catch the train Client

This project is the react frontend of the 'Catch the train' web application. The backend project is also on github: [https://github.com/JulienRobberechts/catch-the-train-server](https://github.com/JulienRobberechts/catch-the-train-server).

The application Catch the train in production: [https://catch-the-train.dev-app.space](https://catch-the-train.dev-app.space) (if deployed)

[![build](https://github.com/JulienRobberechts/catch-the-train-client/workflows/build/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Abuild) [![deploy](https://github.com/JulienRobberechts/catch-the-train-client/workflows/deploy/badge.svg)](https://github.com/JulienRobberechts/catch-the-train-client/actions?query=workflow%3Adeploy)

## Dev Setup

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
```

### Deployment

[Instructions for the deployment of the front-end on AWS S3 + TLS + CDN](./doc/deploy.md)
