FROM node:lts-alpine

ARG STRAPI_VERSION

RUN yarn global add strapi@${STRAPI_VERSION}

RUN mkdir -p /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /srv/app

VOLUME /srv/app

EXPOSE 1337

COPY overrides /home/overrides

RUN chown 1000:1000 -R /home/overrides

COPY entrypoint.sh /usr/local/bin/

ENTRYPOINT ["entrypoint.sh"]

CMD ["strapi", "develop"]
