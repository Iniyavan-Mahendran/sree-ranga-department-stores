# Deployment Guide

This guide explains how to deploy the Sree Ranga e-commerce platform to production environments.

## 🎯 Deployment Overview

Our application consists of three main components:
1. **Frontend** (Next.js) - Deployed to Netlify/Vercel
2. **Backend** (Spring Boot) - Deployed to cloud servers
3. **Database** (PostgreSQL) - Hosted database service

## 🚀 Frontend Deployment (Netlify)

### Prerequisites
- GitHub repository with your code
- Netlify account (free)
- Environment variables configured

### Step 1: Prepare for Deployment
```bash
# 1. Build the application locally to test
npm run build

# 2. Test the production build
npm start

# 3. Commit all changes to Git
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

#### Option B: Manual Deploy
```bash
# Build the application
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

### Step 3: Configure Environment Variables
In Netlify dashboard:
1. Go to Site Settings → Environment Variables
2. Add these variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   ```

### Step 4: Configure Redirects
Create `public/_redirects` file:
```
# Handle client-side routing
/*    /index.html   200

# API proxy (optional)
/api/*  https://your-backend-url.com/api/:splat  200
```

## ⚙️ Backend Deployment (Spring Boot)

### Prerequisites
- Java 17+ installed
- Maven installed
- PostgreSQL database
- Cloud server (AWS, DigitalOcean, etc.)

### Step 1: Prepare Application
```bash
# 1. Update application.yml for production
# Create application-prod.yml
```

```yaml
# application-prod.yml
server:
  port: 8080

spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000

logging:
  level:
    com.sreeranga: INFO
    org.springframework.security: WARN
```

### Step 2: Build Application
```bash
# Clean and build
mvn clean package

# This creates target/sree-ranga-backend-1.0.0.jar
```

### Step 3: Deploy to Server

#### Option A: Traditional Server Deployment
```bash
# 1. Copy JAR to server
scp target/sree-ranga-backend-1.0.0.jar user@your-server:/opt/sreeranga/

# 2. SSH to server
ssh user@your-server

# 3. Create systemd service
sudo nano /etc/systemd/system/sreeranga.service
```

```ini
[Unit]
Description=Sree Ranga Backend
After=network.target

[Service]
Type=simple
User=sreeranga
WorkingDirectory=/opt/sreeranga
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod sree-ranga-backend-1.0.0.jar
Restart=always
RestartSec=10

Environment=DATABASE_URL=jdbc:postgresql://localhost:5432/sree_ranga_prod
Environment=DB_USERNAME=your_db_user
Environment=DB_PASSWORD=your_db_password
Environment=JWT_SECRET=your_super_secret_key

[Install]
WantedBy=multi-user.target
```

```bash
# 4. Start service
sudo systemctl enable sreeranga
sudo systemctl start sreeranga
sudo systemctl status sreeranga
```

#### Option B: Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/sree-ranga-backend-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=jdbc:postgresql://db:5432/sree_ranga_prod
      - DB_USERNAME=postgres
      - DB_PASSWORD=your_password
      - JWT_SECRET=your_secret_key
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=sree_ranga_prod
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Deploy with Docker:
```bash
# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f app
```

## 🗄️ Database Deployment

### Option A: Managed Database (Recommended)

#### AWS RDS
1. Go to AWS RDS Console
2. Create PostgreSQL instance
3. Configure security groups
4. Get connection details

#### DigitalOcean Managed Database
1. Go to DigitalOcean Databases
2. Create PostgreSQL cluster
3. Configure firewall rules
4. Get connection string

### Option B: Self-Hosted Database
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE sree_ranga_prod;
CREATE USER sreeranga WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sree_ranga_prod TO sreeranga;
\q

# Configure PostgreSQL
sudo nano /etc/postgresql/15/main/postgresql.conf
# Set listen_addresses = '*'

sudo nano /etc/postgresql/15/main/pg_hba.conf
# Add: host all all 0.0.0.0/0 md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Database Migration
```bash
# Run migrations (if using Flyway)
mvn flyway:migrate -Dflyway.url=jdbc:postgresql://your-db-host:5432/sree_ranga_prod

# Or run SQL scripts manually
psql -h your-db-host -U sreeranga -d sree_ranga_prod -f schema.sql
```

## 🔒 SSL/HTTPS Configuration

### Frontend (Netlify)
Netlify provides automatic HTTPS for custom domains.

### Backend (Nginx Reverse Proxy)
```nginx
# /etc/nginx/sites-available/sreeranga-api
server {
    listen 80;
    server_name api.sreeranga.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.sreeranga.com;

    ssl_certificate /etc/letsencrypt/live/api.sreeranga.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.sreeranga.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Get SSL certificate:
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d api.sreeranga.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring and Logging

### Application Monitoring
```yaml
# Add to application-prod.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always

logging:
  file:
    name: /var/log/sreeranga/application.log
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

### Log Rotation
```bash
# Create logrotate config
sudo nano /etc/logrotate.d/sreeranga
```

```
/var/log/sreeranga/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 sreeranga sreeranga
    postrotate
        systemctl reload sreeranga
    endscript
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './.next'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
          
      - name: Build with Maven
        run: mvn clean package
        
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/sreeranga
            sudo systemctl stop sreeranga
            rm -f sree-ranga-backend-*.jar
            wget ${{ secrets.ARTIFACT_URL }}
            sudo systemctl start sreeranga
```

## 🚨 Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
DB_NAME="sree_ranga_prod"

# Create backup
pg_dump -h localhost -U sreeranga $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

# Upload to cloud storage (optional)
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://your-backup-bucket/
```

### Automated Backup
```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /opt/scripts/backup.sh
```

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.sreeranga.com
NEXT_PUBLIC_SITE_URL=https://sreeranga.com

# Backend (environment or application-prod.yml)
DATABASE_URL=jdbc:postgresql://your-db-host:5432/sree_ranga_prod
DB_USERNAME=sreeranga
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key_at_least_256_bits
SPRING_PROFILES_ACTIVE=prod
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates configured
- [ ] Monitoring setup
- [ ] Backup strategy in place

### Deployment
- [ ] Build application
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Monitor for errors

### Post-Deployment
- [ ] Check application health
- [ ] Verify all features working
- [ ] Monitor performance
- [ ] Check logs for errors
- [ ] Update documentation

## 🆘 Troubleshooting

### Common Issues

#### Frontend not loading
```bash
# Check build logs
netlify logs

# Verify environment variables
# Check browser console for errors
```

#### Backend not starting
```bash
# Check application logs
sudo journalctl -u sreeranga -f

# Verify database connection
# Check environment variables
```

#### Database connection issues
```bash
# Test connection
psql -h your-db-host -U sreeranga -d sree_ranga_prod

# Check firewall rules
# Verify credentials
```

### Performance Issues
```bash
# Monitor resource usage
htop
df -h
free -m

# Check application metrics
curl http://localhost:8080/actuator/health
```

## 📞 Support

For deployment issues:
- Check logs first
- Verify configuration
- Test in staging environment
- Contact DevOps team: devops@sreeranga.com

Remember: Always test deployments in a staging environment before deploying to production!