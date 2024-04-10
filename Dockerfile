FROM node:18

WORKDIR /build
COPY /server/package*.json .

RUN npm install

COPY  /server/config .
COPY /server/controllers . 
COPY /server/mail .
COPY /server/middlewares .
COPY /server/modules .
COPY /server/routes .
COPY /server/utils .
COPY /server/app.js .

CMD [ "npm", "start" ]





