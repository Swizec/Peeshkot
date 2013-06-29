#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

## Making symlinks
echo "Cleaning up..."
rm $DIR/icons
rm $DIR/libs
rm $DIR/Firefox/icons
rm $DIR/Firefox/data

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
