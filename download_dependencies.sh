#!/bin/bash

echo "Installing python dependencies...";
pip3 install --user -r requirements.txt;

echo "if failed to install dlib, run build_dlib.sh"
