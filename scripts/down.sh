#!/bin/bash

EXTRA=""

if [[ "${1}" = "-r" ]]; then
  EXTRA="--rmi all"

  shift
fi

pushd "$(dirname "$0")/.."

docker-compose down ${EXTRA} "$@" --remove-orphans

popd
