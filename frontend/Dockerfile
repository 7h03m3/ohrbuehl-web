###############
### STAGE 1: Build app
###############
FROM node:lts-alpine as build

WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build

###############
### STAGE 2: Serve app with nginx ###
###############
FROM nginx:1.23.2-alpine
COPY  --from=build /usr/local/app/dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]