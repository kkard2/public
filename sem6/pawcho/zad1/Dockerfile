# warstwa budowania
FROM node:23.1.0 AS build

WORKDIR /app

# zainstalowanie zależności
COPY src/package*.json ./
RUN npm install

COPY src/ .

# warstwa produkcyjna
FROM node:23.1.0
LABEL org.opencontainers.image.authors="Karol Kasperek"

WORKDIR /app

COPY --from=build /app /app

RUN mkdir -p logs

EXPOSE 3000

ARG WEATHER_API_KEY
RUN echo "WEATHER_API_KEY=${WEATHER_API_KEY}" > .env

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --silent --fail http://localhost:3000/ || exit 1

CMD ["npm", "start"]
