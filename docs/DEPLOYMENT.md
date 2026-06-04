# Guide de Déploiement

## Développement Local

### Prérequis

- Node.js 18+
- PostgreSQL 14+
- Docker et Docker Compose (optionnel)
- Git

### Installation sans Docker

#### 1. Cloner le projet

```bash
git clone https://github.com/yohannmayet4-sudo/congo-admin-services.git
cd congo-admin-services
```

#### 2. Configuration Backend

```bash
cd backend

# Copier le fichier d'environnement
cp .env.example .env

# Installer les dépendances
npm install

# Démarrer le serveur
npm run dev
```

Le backend sera accessible sur `http://localhost:5000`

#### 3. Configuration Frontend

```bash
cd ../frontend

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

#### 4. Base de Données

Créer la base de données et les tables :

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE congo_admin;

# Se connecter à la nouvelle BD
\c congo_admin

# Exécuter le script d'initialisation
\i ../database/init.sql
```

---

## Déploiement avec Docker

### Installation rapide

```bash
# À la racine du projet
docker-compose up -d
```

Services démarrés automatiquement :
- **PostgreSQL** : localhost:5432
- **Backend** : localhost:5000
- **Frontend** : localhost:3000

### Vérifier le statut

```bash
docker-compose ps
```

### Arrêter les services

```bash
docker-compose down
```

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Backend seulement
docker-compose logs -f backend

# Frontend seulement
docker-compose logs -f frontend
```

---

## Déploiement en Production

### Prérequis

- Serveur cloud (AWS, DigitalOcean, OVH, Linode, etc.)
- Domaine avec DNS
- SSL/TLS (Let's Encrypt)
- Adresse IP publique

### 1. Configuration du serveur

```bash
# Mettre à jour les paquets
sudo apt update && sudo apt upgrade -y

# Installer Docker et Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
newgrp docker

# Installer Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Cloner et configurer

```bash
# Cloner le projet
git clone https://github.com/yohannmayet4-sudo/congo-admin-services.git
cd congo-admin-services

# Copier et éditer les fichiers d'environnement
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Éditer les configurations
nano backend/.env
nano frontend/.env.local
```

### 3. Variables d'environnement importantes

**backend/.env**
```env
NODE_ENV=production
API_PORT=5000
DATABASE_URL=postgresql://admin:STRONG_PASSWORD@postgres:5432/congo_admin
JWT_SECRET=VERY_LONG_AND_RANDOM_SECRET_KEY_MIN_32_CHARS
FRONTEND_URL=https://yourdomain.com
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 4. Configuration Nginx

Installer Nginx comme reverse proxy :

```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

**Configuration Nginx** (`/etc/nginx/sites-available/congo-admin`)

```nginx
upstream backend {
    server localhost:5000;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Activer la configuration :

```bash
sudo ln -s /etc/nginx/sites-available/congo-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL avec Let's Encrypt

```bash
sudo certbot certonly --nginx -d yourdomain.com -d api.yourdomain.com
sudo certbot renew --dry-run  # Tester le renouvellement automatique
```

### 6. Démarrer l'application

```bash
docker-compose up -d

# Vérifier les services
docker-compose ps

# Voir les logs
docker-compose logs -f
```

### 7. Configuration automatique des backups

Créer un script de sauvegarde (`backup.sh`) :

```bash
#!/bin/bash

BACKUP_DIR="/backups/congo-admin"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Sauvegarde BD
docker exec congo-admin-postgres pg_dump -U admin congo_admin | gzip > "$BACKUP_DIR/bd_$DATE.sql.gz"

# Garder seulement les 7 derniers jours
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Sauvegarde complétée : $DATE"
```

Ajouter au cron (`crontab -e`) :

```cron
0 2 * * * /home/user/backup.sh >> /var/log/congo-backup.log 2>&1
```

---

## Monitoring et Logging

### Prometheus (Métriques)

Ajouter au `docker-compose.yml` :

```yaml
prometheus:
  image: prom/prometheus:latest
  ports:
    - "9090:9090"
  volumes:
    - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
  networks:
    - congo-network
```

### Grafana (Visualisation)

```yaml
grafana:
  image: grafana/grafana:latest
  ports:
    - "3001:3000"
  environment:
    GF_SECURITY_ADMIN_PASSWORD: admin
  networks:
    - congo-network
```

### ELK Stack (Logs)

Pour les logs centralisés, voir la documentation Elasticsearch.

---

## Santé et Performance

### Health Checks

```bash
curl https://api.yourdomain.com/api/health
```

### Monitoring du serveur

```bash
# CPU et mémoire
htop

# Disque
df -h

# Logs Docker
docker-compose logs --tail=100
```

### Optimisations

1. **Cache** : Ajouter Redis pour le cache
2. **CDN** : Cloudflare pour les assets statiques
3. **Compression** : Gzip pour les réponses
4. **Database** : Indexes et requêtes optimisées

---

## Rollback en cas de problème

```bash
# Arrêter les services
docker-compose down

# Restaurer la BD depuis une sauvegarde
docker exec -i congo-admin-postgres psql -U admin congo_admin < backup.sql

# Redémarrer
docker-compose up -d
```

---

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de support
- Consulter la documentation complète

**Plateforme de Services Publics Numériques - Made in Congo 🇨🇩**
