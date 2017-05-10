# Strava

Strava is a React Native application consuming Strava RESTFul web service.
This application was designed for 'bitos' and 'bidochons' in order to complete successfully the 10th 'Grand Raid des Pyrénées'.

# Builds

Android: [![Build Status](https://www.bitrise.io/app/a416933328198685.svg?token=0-NdeRg6y57BlLMUX0VIRg)](https://www.bitrise.io/app/a416933328198685)  iOS: [![Build Status](https://www.bitrise.io/app/17f5bc5ad4a502af.svg?token=08vLH5UDITLIxqCG-tumdw&branch=master)](https://www.bitrise.io/app/17f5bc5ad4a502af)


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

# Configuration

1- go to http://labs.strava.com/developers/
 
2- create an application

3- set application settings

3- go to https://www.strava.com/settings/api

4- retrieve application ID and secret

5- create a new .env file at the root of this project

6- set CLIENT_ID and CLIENT_SECRET keys with retrieved values.

```bash
CLIENT_ID=13456
CLIENT_SECRET=12az12er2151g1tg5t1gt
```

# Launch

```bash
react-native start                     # Compile and launch packager
react-native run-ios                   # Start ios application
or
react-native run-android               # Start android application
```

# References

Strava API: https://strava.github.io/api/

Strava Labs: http://labs.strava.com/



