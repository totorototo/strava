# Lybitos - Strava

Lybitos is a React Native application consuming Strava RESTFul web service.

Application features: 

* Compute athlete performance level
* Select athlete races (get details, path, checkpoints, live track, ...)
* Get athlete details
* Select athlete clubs (get details, parse club activities, get rankings, ...)


# Continuous Integration

Android:[![Build Status](https://travis-ci.org/totorototo/strava.svg?branch=master)](https://travis-ci.org/totorototo/strava)  


# Style

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


# Requirements

* node `^6.9.1`
* npm `^3.10.8`


# Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
git clone https://github.com/totorototo/strava.git
cd strava
yarn install                           # Install project dependencies
```


# Strava Application Configuration

* go to http://labs.strava.com/developers/ 
* create an application
* set application settings
* go to https://www.strava.com/settings/api
* retrieve application ID and secret
* create a new .env file at the root of this project
* paste the following code inside your .env file and make sure to replace [XXX] and [YYY] with your info.

```bash
CLIENT_ID=[XXX]
CLIENT_SECRET =[YYY]
```

* in order to make authentication flow to work, you will have to define the follwoing properties to .env file.
Those will be used in Login component to set callback url used during authentication. 

```bash
URL_SHEME_PREFIX=[yourApplicationName]
URL_SHEME_HOST=localhost
```


# Google MAP API Configuration

* go to https://developers.google.com/maps/documentation/javascript/get-api-key?hl=Fr
* to get a key, follow the instruction
* edit .env file
* paste the following code inside your .env file and make sure to replace [ZZZ] with your info.

```bash
GOOGLE_MAPS_API_KEY=[ZZZ]
```


# Google Firebase Configuration

* go to https://firebase.google.com 
* click “Go to Console” in the top right
* create a new project
* Click the “Add firebase to your web app” link on the home screen and note the config object, we will need this later for the front end setup
* edit .env file
* paste the following code inside your .env file and make sure to replace [AAA], [BBB], [CCC], [DDD], [EEE], [FFF] with your info.

```bash
FIREBASE_APIKEY=[AAA]
FIREBASE_AUTHDOMAIN=[BBB]
FIREBASE_DATABASEURL=https=[CCC]
FIREBASE_PROJECTID=[DDD]
FIREBASE_STORAGEBUCKET=[EEE]
FIREBASE_MESSAGINGSENDERID=[FFF]
```


# Ignition

```bash
react-native start                     # Compile and launch packager
react-native run-ios                   # Start ios application
or
react-native run-android               # Start android application
```

# Debug

If you need to remotely debug this application, just follow this step:

```bash
yarn run remotedev                     # launch remote redux devtools
```

If you need to debug the React application, just fol: 

```bash
yarn run devtools                     # launch react-devtools
```

# References

* Strava API: https://strava.github.io/api/
* Strava Labs: http://labs.strava.com/
* Strava API Google group: https://groups.google.com/forum/#!forum/strava-api



