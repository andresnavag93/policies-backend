<p align="center">
  <img alt="Node.js" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" width="60" />
</p>

<h1 align="center">
  Policies Microservices Backend
</h1>

### Technologies / Tools

- Node.js

### System requirements

- node ^v12.18.3
- npm ^6.14.6

## in MAC OS
docker compose build; docker compose up -d;

## in Linux
docker-compose build && docker-compose up -d;

## Migrations and seeds
docker exec -it -d apigetway-microservice yarn run migrations ; docker exec -it -d client-microservice yarn run migrations

## MYSQL access
docker exec -it mysqldb_container  mysql -u root -p
docker exec -it mysqldb_container_apigetway  mysql -u root -p 

## Delete all images and container

docker stop $(docker ps -a -q);
docker rm $(docker ps -a -q)
