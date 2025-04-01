> !!!!!!!PREFEROWANA FORMA: link do Github !!!!!!

Aby zbudować obraz należy pobrać
[obraz alpine](https://dl-cdn.alpinelinux.org/alpine/v3.21/releases/x86_64/alpine-minirootfs-3.21.3-x86_64.tar.gz)

Polecenie budowy obrazu:
```
> docker build --build-arg VERSION=1.2 -t node-server .

[+] Building 0.9s (19/19) FINISHED
 => [internal] load .dockerignore                                                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                                                        0.0s
 => [internal] load build definition from Dockerfile                                                                                                                                   0.0s
 => => transferring dockerfile: 978B                                                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/nginx:alpine                                                                                                                        0.7s
 => [internal] load build context                                                                                                                                                      0.0s
 => => transferring context: 192B                                                                                                                                                      0.0s
 => [stage2 1/6] FROM docker.io/library/nginx:alpine@sha256:4ff102c5d78d254a6f0da062b3cf39eaf07f01eec0927fd21e219d0af8bc0591                                                           0.0s
 => CACHED [stage2 2/6] RUN apk update && apk add nodejs                                                                                                                               0.0s
 => CACHED [stage2 3/6] COPY nginx.conf /etc/nginx/nginx.conf                                                                                                                          0.0s
 => CACHED [stage1 1/8] ADD alpine-minirootfs-3.21.3-x86_64.tar.gz /                                                                                                                   0.0s
 => CACHED [stage1 2/8] RUN apk update && apk add npm                                                                                                                                  0.0s
 => CACHED [stage1 3/8] RUN mkdir /app                                                                                                                                                 0.0s
 => CACHED [stage1 4/8] WORKDIR /app                                                                                                                                                   0.0s
 => CACHED [stage1 5/8] COPY ./src /app                                                                                                                                                0.0s
 => CACHED [stage1 6/8] COPY ./src/package.json.template /app/package.json.template                                                                                                    0.0s
 => CACHED [stage1 7/8] RUN sed -e "s/__VERSION__/1.2/" package.json.template > package.json                                                                                           0.0s
 => CACHED [stage1 8/8] RUN npm install                                                                                                                                                0.0s
 => CACHED [stage2 4/6] COPY --from=stage1 /app/node_modules /usr/share/nginx/html/node_modules                                                                                        0.0s
 => CACHED [stage2 5/6] COPY --from=stage1 /app/index.js /usr/share/nginx/html                                                                                                         0.0s
 => CACHED [stage2 6/6] COPY --from=stage1 /app /usr/nginx/html                                                                                                                        0.0s
 => exporting to image                                                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                                                0.0s
 => => writing image sha256:47c17959212c30042a85fac96cd7de8f5a16ea36ddd889225af5f32de0d4d74c                                                                                           0.0s
 => => naming to docker.io/library/node-server
```

Polecenie uruchamiające serwer:
```
> docker run -p 80:80 node-server
```

Polecenie potwierdzające działanie kontenera:
```
> docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED              STATUS                        PORTS                    NAMES
78e3ab27e98b   node-server   "/docker-entrypoint.…"   About a minute ago   Up About a minute (healthy)   0.0.0.0:80->80/tcp       nifty_faraday
```

Aplikacja realizuje wymaganą funkcjonalność:
```
> curl localhost:80

Server IP: 172.17.0.4
Hostname: 78e3ab27e98b
App Version: 1.2
```
