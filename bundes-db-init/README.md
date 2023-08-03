
$docker network create backend-network
$docker-compose up -d --build

By running this docker image, players and teams images are imported into a mongodb database which is listening on port 27017. 