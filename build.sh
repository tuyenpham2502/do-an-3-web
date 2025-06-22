#!/bin/bash

# Exit on error
set -e

# Configuration
APP_NAME="do-an-3-web"
PROXY_PORT=8080
BLUE_PORT=8081
GREEN_PORT=8082

echo "🚀 Starting zero-downtime deployment for $APP_NAME..."

# Function to check if container is healthy
check_health() {
    local port=$1
    local max_attempts=30
    local attempt=1

    echo "🏥 Checking health on port $port..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f http://localhost:$port > /dev/null; then
            echo "✅ Container is healthy!"
            return 0
        fi
        echo "⏳ Waiting for container to be ready... ($attempt/$max_attempts)"
        sleep 1
        attempt=$((attempt + 1))
    done
    return 1
}

# Get current active container color (blue or green)
if docker ps --filter "name=$APP_NAME-blue" --format "{{.Names}}" | grep -q "$APP_NAME-blue"; then
    CURRENT_COLOR="blue"
    NEW_COLOR="green"
    CURRENT_PORT=$BLUE_PORT
    NEW_PORT=$GREEN_PORT
else
    CURRENT_COLOR="green"
    NEW_COLOR="blue"
    CURRENT_PORT=$GREEN_PORT
    NEW_PORT=$BLUE_PORT
fi

echo "🔄 Current active container: $CURRENT_COLOR"
echo "🆕 Deploying new container: $NEW_COLOR"

# Build new image
echo "🏗️ Building Docker image..."
docker build -t $APP_NAME:$NEW_COLOR .

# Start new container
echo "🚀 Starting $NEW_COLOR container..."
docker run -d \
    --name "$APP_NAME-$NEW_COLOR" \
    -p $NEW_PORT:80 \
    --restart unless-stopped \
    $APP_NAME:$NEW_COLOR

# Check if new container is healthy
if ! check_health $NEW_PORT; then
    echo "❌ New container failed health check. Rolling back..."
    docker stop "$APP_NAME-$NEW_COLOR"
    docker rm "$APP_NAME-$NEW_COLOR"
    exit 1
fi

# Update nginx reverse proxy configuration
cat > nginx-proxy.conf << EOF
upstream app_backend {
    server localhost:$NEW_PORT;
}

server {
    listen $PROXY_PORT;
    server_name localhost;

    location / {
        proxy_pass http://app_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Reload nginx configuration if it exists, otherwise start nginx
if docker ps --filter "name=nginx-proxy" --format "{{.Names}}" | grep -q "nginx-proxy"; then
    docker cp nginx-proxy.conf nginx-proxy:/etc/nginx/conf.d/default.conf
    docker exec nginx-proxy nginx -s reload
else
    docker run -d \
        --name nginx-proxy \
        -p $PROXY_PORT:$PROXY_PORT \
        -v $PWD/nginx-proxy.conf:/etc/nginx/conf.d/default.conf \
        --restart unless-stopped \
        nginx
fi

# If old container exists, stop and remove it
if docker ps -a --filter "name=$APP_NAME-$CURRENT_COLOR" --format "{{.Names}}" | grep -q "$APP_NAME-$CURRENT_COLOR"; then
    echo "🛑 Stopping and removing old $CURRENT_COLOR container..."
    docker stop "$APP_NAME-$CURRENT_COLOR"
    docker rm "$APP_NAME-$CURRENT_COLOR"
fi

echo "✨ Zero-downtime deployment complete!"
echo "🌍 Application is running at http://localhost:$PROXY_PORT"
echo "🔵 Blue container port: $BLUE_PORT"
echo "🟢 Green container port: $GREEN_PORT"