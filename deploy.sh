#!/bin/bash

echo "Deploying v$npm_package_version"

IP_ADDRESS=${RPI_ADDRESS:-192.168.11.5}

yarn build

scp -r ./build/. pi@$IP_ADDRESS:/home/pi/rpi/public/

