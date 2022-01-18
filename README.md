# docker_for_qa_infoshareacademy

uruchamianie obrazu nastepuje z pliku docker-compose.yml

komenda >> `docker-compose up -d`

sprawdzenei czy wszytsko dziala po sciagnieciu `docker-compose ps`- jezeli w kolumnie "State" jest Up to znaczy ze dziala prawidlowo.

aby zatrzymac usluge >> `docker-compose down`

wyswietlenie dzialajacych obecnie obrazow >> `docker ps`

selenium https://hub.docker.com/r/selenium/hub

twozymy w danym katalogu plik docker-compose.yml

version: '3' # ten klucz jest wymagany
services:
        selenium-hub: # nazwa naszego serwisu
                image: selenium/hub  # nazwa serwisu w docker.hub
                ports: # port na ktorym bedziemy wypuszczac
                        - 4444:4444 # pierwsza wartosc to na jakim porcie to wypuscimy na WEB, druga to na jakim porcie nadaje selenium wedlug dokumentacji

po uruchomieniu docker-compose up -d

mozna sprawdzic logi >> `docker-compose logs`


w naszym grid selenium nie mamy zadnego noda wiec dodajemy obraz:

chrome:
            image: selenium/node-chrome
            depends_on: # poniewaz nasz obraz chrome zalezy od hub dlatego dodajemy 'depends_on' i nazwa servisu od ktorego zalezy
                - selenium-hub
                
                
sprawdzenei czy wogule ruszy poprzez `docker-compose run chrome`

nasz node chrome nie wie pod jakim adresem jest host i trzeba to przekazac za posrednictwem zmiennej srodowiskowej

dodajemy parametr environment do docker-compose

 chrome:
            image: selenium/node-chrome
            depends_on:
                - selenium-hub
            environment:
                HUB_HOST: selenium-hub
                HUB_PORT: 4444
                
 niestety to nie dziala i mam rozazanie ktore dziala
 
 ```yml
 version: '3'
services:
    selenium-hub:
        image: selenium/hub
        container_name: selenium-hub
        ports:
            - 4444:4444
            - 4443-4443
            - 4442:4442
    chrome:
        image: selenium/node-chrome
        depends_on:
            - selenium-hub
        environment:
            SE_EVENT_BUS_HOST: selenium-hub
            SE_EVENT_BUS_PUBLISH_PORT: 4442
            SE_EVENT_BUS_SUBSCRIBE_PORT: 4443
            SE_NODE_MAX_SESSIONS: 5
            HUB_HOST: selenium-hub
            HUB_PORT: 4444
        ports:
            - 6902:5900
 ```
 
 po mojej weryfikacji zmienne hub_host i hub_port nie sa potrzebne dodatkowo lepiej jest uzyc przypisania obiektu `PORT: 4444` zmiast zmiennej `- PORT=4444`

DOKUMENTACJA https://github.com/SeleniumHQ/docker-selenium#selenium-grid-hub-and-nodes

PRZYKLADOWY PLIK https://github.com/SeleniumHQ/docker-selenium/blob/trunk/docker-compose-v3.yml

morzemy lokalnie pobrac sobie plik np https://github.com/SeleniumHQ/docker-selenium/edit/trunk/docker-compose-v3.yml

`wget https://github.com/SeleniumHQ/docker-selenium/edit/trunk/docker-compose-v3.yml`

zmieniamy nazwe `mv docker-compose-v3.yml docker-compose-beta.yml`

zatrzymujemy docker z podaniem w oparciu o ktory plik docker mamy zamknac"
`docker-compose -f docker-compose.yml down`

mozemy teraz uruchomic docker z innego pliku konfiguracyjnego:
`docker-compose -f docker-compose-beta.yml up -d`

leprzy dla oka output jest po `docker-compose ps`

lub poprzez konkretny plik compose

`docker-compose -f docker-compose-beta.yml ps`

mozemy uruchomic help danej komendy aby zobaczyc parametry dodatkowe

`docker-compose -f docker-compose-beta.yml down --help`

--remove-orphans >> usuniecie wszystkich contenerow ktore byly uruchomione z palca a nie poprzez docker-compose file
-v >> usuniecie wszytskich volume ktore zostalo zdefiniowane w pliku docker-compose
--rmi=all >> usuwa obrazy wszystkie uzywane przez dany file docker-compose

linux >> 

`ls -t` wyswietlenie wedlug czasu modyfikacji
`ls --size` wyswietlenie wg objetosci
`ls -l` lista wraz z info na temat modyfikacji
`ls -a` lista rowniez ukrytych plikow i folderow
`ls -R` list z rekurencja czyli wszytsko co jest w folderach chaild

mkdir nazwa_foldera  - tworzy folder
rmdir nazwa_folderu - usuwa folder - pusty
cp - copy
mv only move

uruchamianie skryptow bashowych poprzez komendy:
bash nazwa_pliku
sh nazwa_pliku
./nazwa_pliku

sudo = suoer user do
jezeli przezucimy skrypt bashowy do /usr/bin bedzie on widzialny wszedzie i mozliwy do odpalenia

-r is for reversing command output, -R is a recursive argument

tworzymy docker-compose-tests.yml w ktorym okreslamy co ma sie zadziac - instalacja node

```yml
version: '3'
services:
  test: #nazwa serwisu
    build: ./docker/node #okreslamy polozenie Dockerfile
    volumes:
      - ./tests/spec:/app/spec #okreslamy co bedziemy potrzebowac czyli z ./tests/spec bierzemy zawartosc i w obrazie bedzie to dostepne w /app/spec
    entrypoint: ["node", "./node_modules/jasmine/bin/jasmine.js"] #jasmine zarzadza testami
    environment: ["APP_URL"]

```


Dockerfile - okreslamy w nim co chcemy zainstalowac itd
```yml
FROM node:15
WORKDIR /app
RUN npm install selenium-webdriver && \
    npm install jasmine
```

uruchamiamy build `docker-compose -f docker-compose-tests.yml build`

jak sie uruchomi to mozely wejsc do obrazu poprzez `docker run --rm -it selenium_test bash`

mozemy wyszukac nasz plik sciagniety jasmine.js `find | grep jasmine.js`

wychodzimy z obrazu `exit`

uruchamiany naszego huba `docker-compose -f docker-compose.yml up -d`

i uruchamiamy nasz test


`docker-compose -f docker-compose-tests.yml run --rm test spec/test01.js`

aby w docker uruchomic jakakolwiek aplikacje robimy to przez podanei danych sieciowych `docker run -d --net selenium_default << to jest widoczna nazwa po zatrzymaniu naszego huba uruchamiana_aplikacja`
`docker run -d --net selenium_default nginx:1.19`

docker ps >> listowanie images

`docker inspect 23ff` 23ff to id naszego nginx
na koncu bedziemy widziec IPAdress ktory musimy przekazac jako zmienna srodowiskowa APP_URL
   
`APP_URL=http://172.31.0.1 docker-compose -f .\docker-compose-tests.yml run --rm test spec/test02.js`  << to jest wedlug kursu natomiast na moim srodowisku wywala sie ze nie zna komendy APP_URL

zadzialalo jak przekazalem zmienna na koncu podobnie jak argumenty przy odpalaniu modolow w python

 `docker-compose -f .\docker-compose-tests.yml run --rm test spec/test02.js APP_URL=http://172.31.0.1`
 
 
