# Contribuer au Projet

Merci de l'intérêt que vous portez à ce projet ! Ce document décrit comment contribuer.

## Code de Conduite

Nous nous engageons à maintenir un environnement respectueux et inclusif pour tous.

## Comment contribuer

### 1. Signaler un bug

Ouvrez une issue avec :
- **Titre clair** : "Bug: Description du problème"
- **Description détaillée** : Contexte et reproduction
- **Capture d'écran** : Si applicable
- **Environnement** : OS, navigateur, versions

### 2. Proposer une feature

Ouvrez une issue avec :
- **Titre** : "Feature: Description de la fonctionnalité"
- **Cas d'usage** : Pourquoi c'est utile
- **Mockup/Design** : Si applicable
- **Acceptation criteria** : Définition de "fait"

### 3. Soumettre du code

#### Fork et branch

```bash
# Forker le projet sur GitHub
git clone https://github.com/VOS-NOM/congo-admin-services.git
cd congo-admin-services

# Créer une branche
git checkout -b feature/ma-feature
# ou
git checkout -b fix/mon-bug
```

#### Conventions de commit

```bash
# Feature
git commit -m "feat: Ajouter nouvelle fonctionnalité"

# Bug fix
git commit -m "fix: Corriger le problème de..."

# Documentation
git commit -m "docs: Mettre à jour la documentation"

# Tests
git commit -m "test: Ajouter des tests pour..."

# Style
git commit -m "style: Formater le code"

# Refactoring
git commit -m "refactor: Améliorer la structure du..."
```

#### Code Style

**Frontend (TypeScript/React)**
```typescript
// Utiliser les bonnes pratiques React
const MyComponent: React.FC = () => {
  const [state, setState] = useState(false);
  
  return (
    <div className="...">
      {/* contenu */}
    </div>
  );
};

export default MyComponent;
```

**Backend (TypeScript/Express)**
```typescript
// Utiliser async/await
app.get('/api/route', async (req, res) => {
  try {
    const data = await someAsyncFunction();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### Linting et Formatting

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd ../backend
npm run lint
```

#### Tests

```bash
# Frontend
cd frontend
npm test

# Backend
cd ../backend
npm test
```

#### Build et vérification

```bash
# Frontend
npm run build

# Backend
npm run build
```

#### Pull Request

1. **Pousser votre branche**
   ```bash
   git push origin feature/ma-feature
   ```

2. **Ouvrir une PR sur GitHub**
   - Titre clair et descriptif
   - Description détaillée des changements
   - Lier l'issue associée : `Fixes #123`
   - Capturer les screenshots si UI changement

3. **Template PR**
   ```markdown
   ## Description
   Brève description des changements

   ## Type de changement
   - [ ] Bug fix
   - [ ] Nouvelle fonctionnalité
   - [ ] Documentation
   - [ ] Refactoring

   ## Checklist
   - [ ] Mon code suit le style du projet
   - [ ] J'ai testé les changements
   - [ ] La documentation est mise à jour
   - [ ] Pas de warnings ou erreurs

   ## Screenshots/Gifs (si applicable)
   ```

## Architecture et conventions

### Frontend
- **Framework** : Next.js 14
- **UI** : Tailwind CSS + Shadcn UI
- **State Management** : Zustand
- **HTTP** : Axios
- **Dossiers** : 
  - `app/` : Pages et layouts
  - `components/` : Composants réutilisables
  - `lib/` : Logique métier
  - `types/` : Types TypeScript

### Backend
- **Framework** : Express.js
- **DB** : PostgreSQL
- **Auth** : JWT
- **Dossiers** :
  - `config/` : Configuration
  - `routes/` : Définition des routes
  - `controllers/` : Logique métier
  - `services/` : Logique applicative
  - `middleware/` : Middleware Express
  - `types/` : Types TypeScript

## Processus de review

1. **Code Review** : Vérification du code et des tests
2. **Tests automatisés** : CI/CD avec GitHub Actions
3. **Merge** : Approbation par un mainteneur

## Ressources

- [Documentation Architecture](./docs/ARCHITECTURE.md)
- [Documentation API](./docs/API.md)
- [Documentation BD](./docs/DATABASE.md)
- [Guide Déploiement](./docs/DEPLOYMENT.md)
- [Issues ouvertes](https://github.com/yohannmayet4-sudo/congo-admin-services/issues)

## Questions ?

Ouvrez une discussion ou une issue pour :
- Des questions sur l'architecture
- Des clarifications sur le processus
- Des suggestions d'amélioration

## Merci ! 🙏

Votre contribution nous aide à améliorer cette plateforme pour tous les citoyens de la République du Congo.

**Ensemble pour une meilleure administration numérique 🇨🇩**
