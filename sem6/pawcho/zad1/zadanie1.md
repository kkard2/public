# Zadanie 1

## 1.
Implementacja aplikacji znajduje się w podfolderze `src/`

## 2.
Plik `Dockerfile` dostępny w bieżącym folderze

## 3.

### a) Zbudowanie obrazu kontenera
```
docker build -t weather-app .
```

### b) Uruchomienie kontenera
```
docker run -d -p 3000:3000 -e WEATHER_API_KEY=<API-KEY> weather-app
```
Klucz należy zdobyć zakładająć konto na [weatherapi.com](https://www.weatherapi.com/).

### c) Uzyskanie informacji wygenerowanych przez serwer
```
docker ps
docker exec <CONTAINER-ID> cat /app/logs/combined.log
```

### d) Sprawdzenie ile warstw posiada zbudowany obraz
```
docker history weather-app | tail -n +2 | wc -l
```

## Działanie aplikacji
![screenshot działającej aplikacji pogodowej w przeglądarce pod adresem localhost:3000](res/ss01.png)
![screenshot z uruchomienia zbudowanego obrazu](res/ss02.png)

## Obraz

Obraz znajduje się pod adresem [https://hub.docker.com/r/kkard2/weather-app](https://hub.docker.com/r/kkard2/weather-app)
