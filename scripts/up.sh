#!/bin/bash

pushd "$(dirname "$0")/.."

docker-compose up "$@" --remove-orphans

popd
