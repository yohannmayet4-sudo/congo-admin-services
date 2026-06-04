# Plateforme Nationale de Services Administratifs en Ligne
## République du Congo

### Description
Plateforme web moderne, sécurisée et accessible permettant aux citoyens et résidents d'effectuer leurs démarches administratives en ligne (Passeport, Carte de séjour, Déclaration d'arrivée, etc.).

### Stack Technologique
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, TypeScript
- **Base de données**: PostgreSQL
- **Authentification**: JWT, bcrypt, OTP
- **Stockage**: Documents sécurisés
- **Déploiement**: Docker, Docker Compose

### Structure du Projet
```
congo-admin-services/
├── frontend/          # Application Next.js
├── backend/           # API Node.js/Express
├── database/          # Scripts SQL, migrations
├── docs/              # Documentation
└── docker-compose.yml # Orchestration
```

### Installation Rapide

#### Avec Docker (Recommandé)
```bash
docker-compose up -d
```

Accès :
- Frontend: http://localhost:3000
- API: http://localhost:5000
- PostgreSQL: localhost:5432

#### Installation Locale

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend**
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

### Fonctionnalités Principales

✅ **Authentification**
- Inscription avec vérification OTP
- Connexion sécurisée (JWT)
- Réinitialisation de mot de passe
- Double authentification (optionnel)
- Gestion des rôles (Admin, Agent, Utilisateur, Livreur)

✅ **Services Administratifs**
- Demande de Passeport
- Demande de Carte de Séjour
- Déclaration d'Arrivée
- Formulaires dynamiques
- Téléchargement de documents

✅ **Suivi des Demandes**
- Suivi en temps réel
- Notifications par email
- Historique complet
- Statuts multiples

✅ **Système de Livraison**
- Demande de livraison
- Suivi de livraison
- Signature électronique

✅ **Espace Administrateur**
- Tableau de bord avancé
- Gestion des utilisateurs
- Gestion des dossiers
- Statistiques en temps réel

### Sécurité

🔒 Mesures de sécurité implémentées :
- JWT sécurisé
- Chiffrement des mots de passe (bcrypt)
- Protection CSRF
- Protection XSS
- Rate limiting
- Validation des données
- Logs d'audit complets
- Journalisation des connexions

### Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [API](./docs/API.md)
- [Base de Données](./docs/DATABASE.md)
- [Déploiement](./docs/DEPLOYMENT.md)

### Licence

Gouvernement de la République du Congo

### Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Plateforme de Services Publics Numériques | Made with ❤️ for Congo**
