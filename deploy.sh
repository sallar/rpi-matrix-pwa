#!/bin/bash

echo "Deploying v$npm_package_version"

yarn build

docker build -t led-matrix .
docker tag led-matrix sallar/led-matrix:$npm_package_version
docker push sallar/led-matrix:$npm_package_version

sleep 2

kubectl set image deployment.v1.apps/led-matrix-deployment led-matrix=sallar/led-matrix:$npm_package_version --record
