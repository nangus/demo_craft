#!/bin/bash

#create the lookup deployment and service
kubectl apply -f lookup-deployment.yaml
kubectl apply -f lookup-service.yaml

#use minikube to get a url
minikube service lookup-service --url

