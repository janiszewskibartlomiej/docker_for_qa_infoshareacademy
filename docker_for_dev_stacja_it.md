`docker images` - sprawdzanie obrazów dockerowych ktore zostaly zaciagniete lokalnie `docker images`

`docker ps` - pokazuje jakie kontenery sa u nas uruchomione

`docker stop hashNumer` - zatrzymuje dziłanie poszczegulnego kontenera

`docker inspect nazwaObrazu` - zale info o naszym repo hub

Pobieranei wersji  docker hub poprzez tagi, jak wejdziemy w dany tak to widzimy co jest w srodku 'Dockerfile'

FROM - komenda mowi z jakiego obrazu bedziemy korzystac

RUN - uruchamia komendy z naszego obrazu 'FROM'

nastepnie musimy zbudowac obraz na podstawie naszego Dockerfile

`docker build -t exercise1:v1 .`  - exercise1 to nasza nazwa a v1 to nasz tag ktory nam pomorze w odwolywaniu sie ; kropka oznacza bierzaca lokalizacje
