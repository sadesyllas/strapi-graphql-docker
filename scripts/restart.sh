#!/bin/bash

pushd "$(dirname "$0")/.."

./scripts/stop.sh

./scripts/up.sh -d

popd
