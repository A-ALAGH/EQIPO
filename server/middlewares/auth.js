const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authmiddleware = async (req, res, next) => {
  try {
    // Récupération du token d'authentification depuis les headers de la requête
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Vérification si le token existe
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token d'authentification manquant" });
    }

    // Vérification de la validité du token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Ajout de l'ID de l'utilisateur dans l'objet `req` pour être utilisé dans les routes protégées
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token d'authentification invalide", error: error });
  }
};

module.exports = authmiddleware;