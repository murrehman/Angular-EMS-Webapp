FROM node:14-alpine3.17
WORKDIR /
COPY . .
RUN npm install -g @angular/cli@12
# COPY package.json .
# COPY package-lock.json .
RUN npm install

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
