import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { database } from '@/config/database';

dotenv.config();

const app: Application = express();
const PORT = process.env.API_PORT || 5000;

// ============ MIDDLEWARE DE SÉCURITÉ ============
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Limitation de débit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes
  message: 'Trop de requêtes depuis cette adresse IP',
});
app.use('/api/', limiter);

// Parseurs
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============ ROUTES ============

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes API (à implémenter)
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/services', servicesRoutes);
// app.use('/api/dossiers', dossiersRoutes);
// app.use('/api/deliveries', deliveriesRoutes);
// app.use('/api/admin', adminRoutes);

// ============ GESTION DES ERREURS ============

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    method: req.method,
  });
});

// Erreur globale
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur',
  });
});

// ============ DÉMARRAGE DU SERVEUR ============
app.listen(PORT, async () => {
  try {
    // Vérifier la connexion à la BD
    await database.query('SELECT NOW()');
    console.log('✅ Base de données connectée');
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 API disponible sur http://localhost:${PORT}/api`);
  } catch (error) {
    console.error('❌ Erreur de connexion BD:', error);
    process.exit(1);
  }
});

export default app;
