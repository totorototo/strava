# Strava

Strava is a React Native application consuming Strava RESTFul web service.


# Continuous Integration

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

* go to http://labs.strava.com/developers/ 
* create an application
* set application settings
* go to https://www.strava.com/settings/api
* retrieve application ID and secret
* create a new .env file at the root of this project
* paste the following code inside your .env file and make sure to replace [XXX] and [YYY] with your info.

```bash
CLIENT_ID=[XXX]
CLIENT_SECRET=[YYY]
GOOGLE_MAPS_API_KEY=[ZZZ]
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

# Screenshots

>Compute your performance: | >Follow your progression during races: | >Get your profile performances summary: | >Get the latest breaking news of your club: 
--- | --- | --- |---
![Alt text](docs/images/performance-meter.png) | ![Alt text](docs/images/race.png) | ![Alt text](docs/images/athlete-details.png) | ![Alt text](docs/images/club-details.png)


# References

* Strava API: https://strava.github.io/api/
* Strava Labs: http://labs.strava.com/



