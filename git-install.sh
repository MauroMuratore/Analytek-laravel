#!/bin/bash

$DIR_PROJECT=$1

if [ ! -d $DIR_PROJECT ]; then
    echo "Directory $DIR_PROJECT does not exist."
    exit 1
fi

rsync -av src/* $DIR_PROJECT/
rsync -av analytek-migrate.sh $DIR_PROJECT