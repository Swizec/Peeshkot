#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

## Making symlinks

echo "Making symlinks"

## Chrome extension doesn't load symlink
# Because of *stupid* Chrome policy we must keep original files in Chrome folder
# for easier development (ref: http://developer.chrome.com/extensions/external_extensions.html)

# Root
ln -s $DIR/Chrome/icons icons
ln -s $DIR/Chrome/libs libs

# Firefox
ln -s $DIR/Chrome/icons Firefox/
ln -s $DIR/Chrome/libs Firefox/data
