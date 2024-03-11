#!/bin/bash

docker kill gorioshi
docker rm -f gorioshi

docker run --detach \
  --name gorioshi \
  --env LETSENCRYPT_HOST=yuuk1.tk,yuuk1.uk \
  --env VIRTUAL_HOST=yuuk1.tk,yuuk1.uk \
  --env VIRTUAL_PORT=3000 \
  gorioshi
