#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

## Making symlinks
echo "Cleaning up..."
if [ -e $DIR/icons ]; then
    rm $DIR/icons
fi
if [ -e $DIR/libs ]; then
    rm $DIR/libs
fi
if [ -e $DIR/Firefox/icons ]; then
    rm $DIR/Firefox/icons
fi
if [ -e $DIR/Firefox/data ]; then
    rm $DIR/Firefox/data
fi

echo "Making symlinks"

## Chrome extension doesn't load symlink
# Because of *stupid* Chrome policy we must keep original files in Chrome folder
# for easier development (ref: http://developer.chrome.com/extensions/external_extensions.html)

# Root
ln -s $DIR/Chrome/icons $DIR/icons
ln -s $DIR/Chrome/libs $DIR/libs

# Firefox
ln -s $DIR/Chrome/icons $DIR/Firefox/icons
ln -s $DIR/Chrome/libs $DIR/Firefox/data
