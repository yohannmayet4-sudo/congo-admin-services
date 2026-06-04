# Documentation API

## Base URL
```
http://localhost:5000/api
```

## Authentification

Tous les endpoints protégés nécessitent un JWT dans le header Authorization :
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

#### Vérifier l'état du serveur
```http
GET /health
```

**Response (200)**
```json
{
  "status": "OK",
  "timestamp": "2024-06-04T20:45:00Z",
  "uptime": 125.34
}
```

---

### Authentification (À implémenter)

#### Inscription
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "+243...",
  "birthDate": "1990-01-15",
  "nationality": "Congolaise"
}
```

**Response (201)**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "message": "OTP envoyé à votre email"
}
```

#### Vérification OTP
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

#### Connexion
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Jean",
    "role": "user"
  }
}
```

---

### Services

#### Lister tous les services
```http
GET /services
```

**Response (200)**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Passeport",
      "description": "Demande de passeport national",
      "type": "passport",
      "required_documents": ["photo", "birth_certificate", "id_document"]
    },
    {
      "id": "uuid",
      "name": "Carte de Séjour",
      "description": "Demande de carte de séjour",
      "type": "residence_card",
      "required_documents": ["identity_proof", "residence_proof", "financial_proof"]
    }
  ]
}
```

#### Obtenir un service
```http
GET /services/:id
```

---

### Dossiers

#### Créer une demande
```http
POST /dossiers
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "uuid",
  "data": {
    "birthPlace": "Kinshasa",
    "birthDate": "1990-01-15"
  }
}
```

**Response (201)**
```json
{
  "id": "uuid",
  "folderNumber": "RDC-202406-XXXXXX",
  "status": "draft",
  "serviceId": "uuid",
  "createdAt": "2024-06-04T20:45:00Z"
}
```

#### Lister mes dossiers
```http
GET /dossiers
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "data": [
    {
      "id": "uuid",
      "folderNumber": "RDC-202406-XXXXXX",
      "status": "draft",
      "serviceName": "Passeport",
      "createdAt": "2024-06-04T20:45:00Z",
      "updatedAt": "2024-06-04T20:45:00Z"
    }
  ]
}
```

#### Obtenir un dossier
```http
GET /dossiers/:id
Authorization: Bearer <token>
```

#### Soumettre un dossier
```http
PUT /dossiers/:id/submit
Authorization: Bearer <token>
```

---

### Notifications

#### Lister mes notifications
```http
GET /notifications
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "success",
      "title": "Dossier accepté",
      "message": "Votre dossier a été validé",
      "read": false,
      "createdAt": "2024-06-04T20:45:00Z"
    }
  ]
}
```

#### Marquer comme lu
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

---

### Admin (À implémenter)

#### Tableau de bord
```http
GET /admin/dashboard
Authorization: Bearer <admin_token>
```

**Response (200)**
```json
{
  "statistics": {
    "totalUsers": 150,
    "totalDossiers": 250,
    "pendingDossiers": 45,
    "completedDossiers": 180
  },
  "recentDossiers": [],
  "recentUsers": []
}
```

#### Lister tous les dossiers (admin)
```http
GET /admin/dossiers
Authorization: Bearer <admin_token>
```

#### Mettre à jour un dossier (admin)
```http
PUT /admin/dossiers/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "validated",
  "comments": "Dossier complet et conforme"
}
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

## Rate Limiting

- Limite : 100 requêtes par 15 minutes
- Header : `X-RateLimit-Remaining`
- Erreur (429) : "Trop de requêtes depuis cette adresse IP"

## Exemples avec cURL

### Vérifier la santé
```bash
curl http://localhost:5000/api/health
```

### Lister les services
```bash
curl http://localhost:5000/api/services
```

### Connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```
