FROM node:8.9.4-alpine

ENV HTTP_PORT 4891
EXPOSE 4891

COPY ./ /var/www
VOLUME /etc/letsencrypt
WORKDIR /var/www
RUN ["npm", "install"]
CMD ["npm", "run", "start"]
