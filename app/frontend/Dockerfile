#!/usr/bin/env bash
#!/bin/bash
FROM node:15.14.0-buster
WORKDIR /frontend
COPY  . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]