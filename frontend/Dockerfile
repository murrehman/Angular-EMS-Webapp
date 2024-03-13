FROM node:14.21.3
WORKDIR /
COPY . .
RUN npm install -g @angular/cli@12
COPY ../package.json .
COPY ../package-lock.json .
RUN npm ci

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
