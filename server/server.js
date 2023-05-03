const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration du parser pour les requêtes avec le body en json
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour l'authentification
const authMiddleware = require('./middlewares/auth');
app.use('/', authMiddleware);

// Définition des routes pour les utilisateurs
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Démarrage du serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 3000}`);
});