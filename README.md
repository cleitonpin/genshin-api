# genshin-api

## Usage [Docker]

1. Building your image
```console
$ docker build -t <your username>/genshin-api .
```
2. Run the image
```console
$ docker run 49160:<port> -d <your username>/genshin-api

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
$ ⚡️ [Server]: running at http://localhost:${PORT}
```
