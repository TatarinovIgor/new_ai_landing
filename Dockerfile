# Stage 1: Build the code
FROM node:16-alpine as build

WORKDIR /app

# Set build ENV
ARG ARG_VITE_BASE_URL=http://127.0.0.1:4455
ENV VITE_BASE_URL ${ARG_VITE_BASE_URL}

# Copy package.json and yarn.lock files to the workdir
COPY package.json ./

# Install project dependencies
RUN npm install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN sed -i "s|\$http_origin|${VITE_BASE_URL}|g" /app/nginx.conf

# Build the project. This will create a /dist folder with everything needed to run the application
RUN npm build

# Stage 2: Serve the app with nginx
FROM nginx:1.21-alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built code to nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx.conf
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4455

CMD ["nginx", "-g", "daemon off;"]
