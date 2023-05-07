// Importer le module express
const express = require('express');

// Créer un routeur
const router = express.Router();

// Importer le controller
const {createUser, getUserById, getAllUsers,updateUser,deleteUser} = require('../controllers/userController');

// Importer middleware authentification
const authMiddleware = require ('../middlewares/auth')

// Créer les routes pour les différentes fonctions du controller
router.post('/', createUser); // Route pour créer un utilisateur
router.get('/:id', getUserById); // Route pour récupérer un utilisateur par son identifiant
router.put('/:id', updateUser); // Route pour mettre à jour les informations d'un utilisateur
router.delete('/:id', deleteUser); // Route pour supprimer un utilisateur
router.get('/', getAllUsers, authMiddleware); // Route pour récupérer tous les utilisateurs

// Exporter le routeur
module.exports = router;
