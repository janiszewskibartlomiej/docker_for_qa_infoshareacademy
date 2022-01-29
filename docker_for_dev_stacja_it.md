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
ENTRYPOINT ["./bin/echo", "hello"]
CMD ./bin/echo hello
```

`docker container run exercise3:v3` i wyprintuje si ena napis hello

jest roniez forma shellowa `ENTRYPOINT echo "Hello there"`

mozmy rowniez nadpisac entrypoint z kosoli jak podany flage:

`docker container run --entrypoint "./bin/echo" exercise3:v3 "Hellow now Bart"`

Komenda WORKDIR wskazuje nasza przestrzen w ktorej bedzie sie cos wykonywac WORKDIR tworzy rowniez katalog jezeli go w tej lokalizacji nie bylo

`docker build -t exercise4:v1 .`
`docker run -it exercise4:v1 pwd` # -i tryb interactywny


dolejny docker file jako exercise5:

```yml
FROM python:3.8

RUN apt-get update

RUN pip install Flask

COPY . /opt/web

WORKDIR /opt/web

ENV FLASK_APP=hello.py

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"] # robimy na porcie 0.0.0.0 bo jest wrzucany na wszedzie acznei z naszym localhost:5000 - to bedzie widoczne
```

`docker build -t exercise5:v1`
`docker run -p 5000:5000 exercise5:v1`

