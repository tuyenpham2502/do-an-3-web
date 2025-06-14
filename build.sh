#!/bin/bash

# Exit on error
set -e

# Configuration
APP_NAME="do-an-3-web"
PORT=8080

echo "🚀 Building and deploying $APP_NAME..."

# Stop and remove existing container if it exists
if docker ps -a | grep -q $APP_NAME; then
    echo "🛑 Stopping existing container..."
    docker stop $APP_NAME || true
    docker rm $APP_NAME || true
fi

# Build the Docker image
echo "🏗️ Building Docker image..."
docker build -t $APP_NAME .

# Run the container
echo "🚀 Starting container..."
docker run -d \
    --name $APP_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $APP_NAME

echo "✨ Deployment complete!"
echo "🌍 Application is running at http://localhost:$PORT"