FROM node:14.21.3
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@12
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
