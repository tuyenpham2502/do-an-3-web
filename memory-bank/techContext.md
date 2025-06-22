# Technical Context

## Development Environment

### Core Technologies
- Vite + React + TypeScript
- TailwindCSS for styling
- Yarn package manager
- Docker for containerization

### Docker Configuration
- Multi-stage build process
- Development and production environments
- Zero-downtime deployment using blue-green pattern
- Nginx for production serving and reverse proxy

### Key Files
- `Dockerfile`: Multi-stage build configuration
- `docker-compose.yml`: Development environment setup
- `nginx.conf`: Production web server configuration
- `build.sh`: Zero-downtime deployment script
- `.dockerignore`: Build optimization

### Container Architecture
- Development:
  - Single container with hot-reloading
  - Volume mounts for local development
  - Port 5173 exposed for dev server

- Production:
  - Blue-green deployment pattern
  - Nginx reverse proxy on port 8080
  - Blue container on port 8081
  - Green container on port 8082

### Environment Variables
- Development variables in .env.development
- Production configuration via Docker environment

## Dependencies
[List any key dependencies from package.json]