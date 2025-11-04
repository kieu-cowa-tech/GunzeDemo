# Docker Deployment Guide

## Files Created

1. **Dockerfile** - Multi-stage build for production deployment
2. **docker-compose.yml** - Docker Compose configuration
3. **.dockerignore** - Files to exclude from Docker build
4. **nginx.conf** - Nginx configuration for serving the app

## Usage

### Production Build

Build and run the production version:

```powershell
# Build and start the container
docker-compose up -d

# Access the app at http://localhost:3000
```

Stop the container:

```powershell
docker-compose down
```

### Development Mode

Run the development version with hot reload:

```powershell
# Start development container
docker-compose --profile dev up gunzedemo-dev

# Access the app at http://localhost:3001
```

### Manual Docker Commands

Build the image:

```powershell
docker build -t gunzedemo:latest .
```

Run the container:

```powershell
docker run -d -p 3000:80 --name gunzedemo gunzedemo:latest
```

Stop and remove the container:

```powershell
docker stop gunzedemo
docker rm gunzedemo
```

## Configuration

### Port Mapping

- **Production**: Port 3000 → Container port 80
- **Development**: Port 3001 → Container port 3000

You can change these in `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:80"  # For production
  - "YOUR_PORT:3000"  # For development
```

### Environment Variables

Add environment variables in `docker-compose.yml`:

```yaml
environment:
  - VITE_API_URL=https://api.example.com
  - VITE_APP_TITLE=My App
```

### Custom Nginx Configuration

The `nginx.conf` file is already configured for:
- React Router support (SPA)
- Gzip compression
- Static asset caching
- Security headers

To use it, uncomment this line in `Dockerfile`:

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## Troubleshooting

### View logs

```powershell
docker-compose logs -f
```

### Access container shell

```powershell
docker exec -it gunzedemo-app sh
```

### Rebuild after changes

```powershell
docker-compose up -d --build
```

### Clean up

Remove all containers, images, and volumes:

```powershell
docker-compose down -v
docker rmi gunzedemo:latest
```

## Production Deployment

For production deployment, consider:

1. Using a specific Node.js version
2. Setting up SSL/TLS with a reverse proxy
3. Adding health checks
4. Implementing proper logging
5. Setting resource limits

Example with resource limits in `docker-compose.yml`:

```yaml
services:
  gunzedemo:
    # ... existing config
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```
