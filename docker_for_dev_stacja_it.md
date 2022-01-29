`docker images` - sprawdzanie obrazów dockerowych ktore zostaly zaciagniete lokalnie `docker images`

`docker ps` - pokazuje jakie kontenery sa u nas uruchomione

`docker stop hashNumer` - zatrzymuje dziłanie poszczegulnego kontenera

`docker inspect nazwaObrazu` - zale info o naszym repo hub

Pobieranei wersji  docker hub poprzez tagi, jak wejdziemy w dany tak to widzimy co jest w srodku 'Dockerfile'

FROM - komenda mowi z jakiego obrazu bedziemy korzystac

RUN - uruchamia komendy z naszego obrazu 'FROM'

nastepnie musimy zbudowac obraz na podstawie naszego Dockerfile

`docker build -t exercise1:v1 .`  - exercise1 to nasza nazwa a v1 to nasz tag ktory nam pomorze w odwolywaniu sie ; kropka oznacza bierzaca lokalizacje

ADD pozwala dodac jakies pliki lub z URL do kontenera

`docker build -t exercise2:v2 ${pwd}` aby zbudowac obraz w systemie.

odpalenie np konsoli w tym obarazie /bin/sh a caly run `docker run -itd exercise2:v2 /bin/sh`

sprawdzamy czy nam sie uruchomilo >> `docker ps`
wchodzimy do srodka `docker attach id_container`

czesciej uzywa sie komendy COPY niz ADD

Jezeli chcemy aby cos sie wykonalo zawsze po zbudowaniu kontenera to uzywamy komendy ENTRYPOINT bo CMD moze byc nadpisana  

jest rowneiz roznica w pisaniu

```yml
ENTRYPOINT ["/bin/echo", "hello"]
CMD /bin/echo hello
```

