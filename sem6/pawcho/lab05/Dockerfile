FROM scratch AS stage1
ADD alpine-minirootfs-3.21.3-x86_64.tar.gz /

ARG VERSION
ENV APP_VERSION=${VERSION:-1.0}

RUN apk update && apk add npm

RUN mkdir /app
WORKDIR /app
COPY ./src /app

# Copy the package.json template into the container
COPY ./src/package.json.template /app/package.json.template

# Replace the placeholder __VERSION__ with the version argument
RUN sed -e "s/__VERSION__/$APP_VERSION/" package.json.template > package.json

RUN npm install

FROM nginx:alpine AS stage2

RUN apk update && apk add nodejs

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=stage1 /app/node_modules /usr/share/nginx/html/node_modules
COPY --from=stage1 /app/index.js /usr/share/nginx/html
COPY --from=stage1 /app /usr/nginx/html

EXPOSE 80

HEALTHCHECK --interval=60s --timeout=1s \
    CMD curl -f http://127.0.0.1 || exit 1

CMD ["sh", "-c", "node /usr/nginx/html/index.js & nginx -g 'daemon off;'"]
