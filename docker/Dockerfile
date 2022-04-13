FROM ubuntu:20.04

RUN apt update && apt install -y nodejs && apt install -y npm

WORKDIR /var/www
COPY ./simpleServer.js simpleServer.js
EXPOSE 3000

CMD node simpleServer.js
