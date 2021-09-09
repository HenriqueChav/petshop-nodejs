FROM node:latest
LABEL maintainer="Henrique C. Lopes"
WORKDIR /usr/app
COPY ./app/package.json /usr/app
ENTRYPOINT npm start
RUN npm install
EXPOSE 3000