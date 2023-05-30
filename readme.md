# Polygon-pos-indexer

This Application is a indexer for polygon pos chain, built on Event-driven microservice architechure with kafka. 

Application is divided into three microservices:

* Chain-data-fetcher (Fetcher)
* Chain-data-filterer (Filterer)
* Chain-data-provider (provider)

## Requirement

* Docker Enviornment:
  Application is build using docker enviornment, to run the application docker must be installed in your local machine, go though this for installation [Docker Install](https://docs.docker.com/get-docker/)

* Alchemy and GetBlock RPC node api key :  
This Application using Alchemy and GetBlock for RPC node service for polygon pos chain, required to add api key for both in respective .env file of fetcher and filterer

## Installation

Used docker enviornment to build the application, everything is already set up at docker-compose file, just need to use the below command to build the containers

>`docker-compose up --build`

## Use

After running the app, You can interact with the dedicated open-api at http://localhost:7000/:transactionhash, this will provide the current status of the given transaction
