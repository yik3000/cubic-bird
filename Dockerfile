FROM node:8-slim

WORKDIR /usr/app
ENV NODE_ENV development

COPY ./package*.json ./

RUN npm install
#RUN npm install --production

COPY ./ ./ 
EXPOSE 8080

#COPY . /starter

CMD ["npm","start"]

