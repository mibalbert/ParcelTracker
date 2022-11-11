FROM denoland/deno:1.17.1

EXPOSE 8080

WORKDIR /app

USER deno

COPY deps.js .

RUN deno cache --unstable deps.js

COPY . .

RUN deno cache --unstable index.js

# RUN mkdir -p /var/tmp/log

CMD ["run", "--allow-all", "--unstable", "index.js"]