FROM node:15.14.0-buster
WORKDIR /frontend
COPY  . .
RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
