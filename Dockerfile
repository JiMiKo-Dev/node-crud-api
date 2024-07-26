FROM node:20

WORKDIR /user/src/test_api

COPY . .

RUN npm install

EXPOSE 3300

CMD ["npm", "run", "serve"] 

