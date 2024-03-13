FROM node:14.21.3
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@12
COPY package.json .
RUN npm ci


CMD ["ng", "serve", "--host", "0.0.0.0"]
