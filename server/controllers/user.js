const User = require('../models/user');

// Fonction pour créer un utilisateur
exports.createUser = (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    interests: req.body.interests,
    role: req.body.role
  });

  user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
};

// Fonction pour récupérer un utilisateur par son identifiant
exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction pour mettre à jour les informations d'un utilisateur
exports.updateUser = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    interests: req.body.interests,
    role: req.body.role
  });

  User.updateOne({ _id: req.params.id }, user)
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};