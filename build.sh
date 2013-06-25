#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


## Making symlinks

# Chrome
ln -s $DIR/icons Chrome/
ln -s $DIR/libs Chrome/

# Firefox
ln -s $DIR/icons Firefox/
ln -s $DIR/libs Firefox/data
