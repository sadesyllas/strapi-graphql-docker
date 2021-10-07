#!/bin/bash

pushd "$(dirname "$0")"

docker-compose logs -f

popd
