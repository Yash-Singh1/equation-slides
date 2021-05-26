#!/usr/bin/bash

echo -n 'Clearing Workspace...' && rm -rf dist && rm -rf dist.zip && echo 'done' || exit 1
echo -n 'Copying files...' && mkdir dist && mkdir dist/img && cp {background.js,deinitialize.js,initialize.js,manifest.json,options.css,options.html,options.js,popup.css,popup.html,popup.js} dist && cp img/icon.png dist/img && echo 'done' || exit 1

if [ "$1" != "--no-zip" ] && [ "$1" != "-n" ]
then
  echo 'Zipping...' && echo && zip -r dist.zip dist && echo && echo 'DONE!!!' || exit 1
fi
