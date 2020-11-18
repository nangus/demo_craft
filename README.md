# Country Code Reference lookups

A simple country code look up app.

## Description

This app is designed to allow for the easy lookup of country codes, it works in both cli and rest configurations.

## Getting Started

### Dependencies

* minikube
* upload the docker image to the minikube internal repo

```
eval $(minikube -p minikube docker-env)
docker build -t lookup:1.0.0 .
```

### Installing

to start with minikube

```
* ./start.sh
```

to remove the kubernetes deployment and service

```
./cleanup.sh
```

### Executing program

* CLI Interface:

```
./lookup --countryCode=AU
```

* start api with an optional port parameter

```
./lookup --startRest [--port=3000]
```

## URLs

The base URL should be dumped in the start command.

/diag - returns the raw data
/convert?cc=XX - returns the country name for XX
/convert?name=NAME - returns the country code for NAME
/health - returns OK



## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Nicholas Jones - nojones@gmail.com

## Version History

* 1.0.0
    * Initial Release - basic features currently available including cli and web interface

## License

MIT

