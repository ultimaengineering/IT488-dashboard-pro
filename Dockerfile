FROM nginx:stable-alpine
WORKDIR /workspace
RUN ls -la
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY * /usr/share/nginx/html