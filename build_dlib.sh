#!/bin/sh

# if download_dependencies.sh fails to download dlib,
#  this script will download it.
# it takes approximately 5 minutes, and is an intensive process

echo "only run this script if download_dependencies.sh failed to download dlib";

wget https://codeload.github.com/davisking/dlib/zip/master;
mv master dlib.zip;
unzip dlib.zip;
cd dlib-master;
python setup.py install;
