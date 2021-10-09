#!/bin/sh

set -ea

if [ "$1" = "strapi" ]; then

  if [ ! -f "package.json" ]; then

    DATABASE_CLIENT=${DATABASE_CLIENT:-sqlite}

    EXTRA_ARGS=${EXTRA_ARGS}

    echo "Using strapi $(strapi version)"
    echo "No project found at /srv/app. Creating a new strapi project"

    DOCKER=true strapi new . \
      --dbclient=$DATABASE_CLIENT \
      --dbhost=$DATABASE_HOST \
      --dbport=$DATABASE_PORT \
      --dbname=$DATABASE_NAME \
      --dbusername=$DATABASE_USERNAME \
      --dbpassword=$DATABASE_PASSWORD \
      --dbssl=$DATABASE_SSL \
      $EXTRA_ARGS

    strapi install graphql

  elif [ ! -d "node_modules" ] || [ ! "$(ls -qAL node_modules 2>/dev/null)" ]; then

    echo "Node modules not installed. Installing..."

    if [ -f "yarn.lock" ]; then

      yarn install

    else

      npm install

    fi

    strapi install graphql

  fi

fi

echo "Overriding config/server.js..."

cp -f /home/server.js /srv/app/config/server.js

echo "Overriding config/middleware.js..."

cp -f /home/middleware.js /srv/app/config/middleware.js

echo "Overriding config/functions/cron.js..."

cp -f /home/cron.js /srv/app/config/functions/cron.js

echo "Starting your app..."

exec "$@"
