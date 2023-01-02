#!/bin/bash

$DIR_PROJECT=$1

if [ ! -d $DIR_PROJECT ]; then
    echo "Directory $DIR_PROJECT does not exist."
    exit 1
fi

rsync -va --exclude "routes" src/* $DIR_PROJECT

