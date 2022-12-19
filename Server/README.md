# Server
API and web server developed with NodeJS and MongoDB.
## Dependencies
Nodejs and Node Package Manager.
## Usage
The urls point to a host named rpi. You have got 2 options:
* Alias your host to "rpi" in your /etc/hosts
* Find and replace "rpi" for your host's name in index.js and app.js 

In this folder, just run:
```
$ node install
```
This will automatically download all the project dependencies into a folder called "node_modules".

Then, in the file called mongo.js, change the field password for the one that you will ask me for.

Please, be sure that you don't run two instances at the same time.