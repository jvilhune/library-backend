Syväsukellus moderniin websovelluskehitykseen Full Stack open OSA 8. Tehtavat (8.1 - 8.26) eli osan 8 loppuun asti.
Syväsukellus moderniin websovelluskehitykseen Full Stack open OSA 8. Tehtavat (8.1 - 8.26) eli osan 8 loppuun asti.
https://fullstackopen.com/osa8
https://fullstackopen.com/osa8

BACKEND-OHJELMISTO
C:\Users\PC\library-backend

FRONTEND-OHJELMISTO
C:\Users\PC\library-frontend

BACKEND-OHJELMISTON KAYNNISTYS
C:\Users\PC\library-backend>npm run dev

FRONTEND-OHJELMISTON KAYNNISTYS
C:\Users\PC\library-frontend>npm start
-> NAYTOLLE TULOSTUU OSOITE, JOHON SELAIMELLA OTETAAN YHTEYS
-> http://localhost:3000/

************************************************************************************

DEVELOPMENT VERSIONS (HOW TO TEST FRONTEND/BACKEND)

************************************************************************************

Make sure that addresses in library-frontend/src/index.js file are:

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
url: 'ws://localhost:4000'

START BACKEND
C:\Users\PC\library-backend> npm run dev

START APOLLO EXPLORER/SANDBOX (SUBCRIPTIONS/QUERY-TESTAUSTA)
Open browser and connect it to http://localhost:4000

START FRONTEND
C:\Users\PC\library-frontend> npm start
Or open browser and connect it to http://localhost:3000

************************************************************************************

PRODUCTION VERSIONS (HOW TO PUT FRONTEND/BACKEND INTO INTERNET)

************************************************************************************

Change addresses in library-frontend/src/index.js file

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
->
const httpLink = new HttpLink({ uri: 'https://library-backend-ue20.onrender.com/' })

url: 'ws://localhost:4000'
->
url: 'ws://library-backend-ue20.onrender.com/'

LIBRARY-BACKEND https://library-backend-ue20.onrender.com

Do not try to compile it. Just put it into github and make a web service in https://dashboard.render.com/
Get address from render (for example) https://library-backend-ue20.onrender.com
Open browser and connect to https://library-backend-ue20.onrender.com

LIBRARY-FRONTEND https://library-frontend-l6lm.onrender.com/

Compile it (npm run build). Put it into github and make a web service in https://dashboard.render.com/
Get address from render (for example) https://library-frontend-l6lm.onrender.com/
Open browser and connect to https://library-frontend-l6lm.onrender.com/
