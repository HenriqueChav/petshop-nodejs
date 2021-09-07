FROM node:latest
LABEL maintainer="Henrique C. Lopes"
COPY . /var/www
WORKDIR /var/www
ENTRYPOINT ["npm", "install"]
RUN ["npm", "start"]
EXPOSE 3000