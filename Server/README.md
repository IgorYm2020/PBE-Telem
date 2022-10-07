# Server
Full tutorial [here](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
## Dependencies
* Docker
```
$ sudo apt-get install docker.io
```
## Running
Run the machine in the specified port and with your username:
```
$ docker run -p 49160:8080 -d <your username>/node-web-app
```
Get the container ID with:
```
$ docker ps
```
For an interactive terminal, use:
```
$ docker exec -it <container id> /bin/bash
```
## Test
```
$ docker ps

# Example
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```
With curl installed and from the external machine:
```
$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive

Hello world
```
## Shutting down
```
# Kill our running container
$ docker kill <container id>
<container id>

# Confirm that the app has stopped
$ curl -i localhost:49160
curl: (7) Failed to connect to localhost port 49160: Connection refused
```