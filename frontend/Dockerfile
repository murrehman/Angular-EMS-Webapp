FROM node:14.21.3
WORKDIR /app

RUN npm install -g @angular/cli@12
COPY package.json package-lock.json
RUN npm ci
COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]
