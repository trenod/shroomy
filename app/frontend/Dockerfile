FROM node:15.14.0-buster AS build
WORKDIR /frontend
COPY . .
RUN npm install
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_FRONTEND_BASE_URL
RUN npm run build
COPY --from=build /frontend/build /frontend/build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
