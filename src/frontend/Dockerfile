FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ || exit 1

# Environment variables
ENV REACT_APP_API_URL=https://api.example.com
ENV REACT_APP_ENVIRONMENT=production

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set up non-root user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser
USER appuser

# Set up volume for logs
VOLUME /var/log/nginx

# Labels
LABEL maintainer="Your Name <your.email@example.com>"
LABEL version="1.0"
LABEL description="Frontend Dockerfile for Podcast Marketing Automation SaaS platform"