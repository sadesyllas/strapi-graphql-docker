## Description

These instructions allow one to easilly start/stop/remove strapi,
using a local Docker installation.

This process creates a git ignored directory, ie `./app`,
where the SQLite3 database and the whole strapi application
files are stored.

## Prerequisites

* Install Docker: https://docs.docker.com/get-started/
* Install Docker Compose: https://docs.docker.com/compose/

## Start/Stop/Remove strapi

```bash
# build the `local-strapi:latest` Docker image
docker-compose build
# this starts strapi and returns control to the console
# remove -d to kill strapi with Ctrl-c
docker-compose up -d
# check if strapi has properly started
docker-compose logs -f
# stop but not remove the strapi container
docker-compose stop
# stop and remove the strapi container along with any built Docker image(s)
docker-compose down --rmi all
# remove strapi's application data
# when `docker-compose up -d` is run again, this folder will be recreated
rm -rf app
```

**Note**: It is not necessary to remove `./app`, since it's
being ignored by git.
