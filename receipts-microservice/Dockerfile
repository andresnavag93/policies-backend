FROM node:15-alpine

WORKDIR /app
RUN apk add git g++ make python libtool libc6-compat
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 8000



