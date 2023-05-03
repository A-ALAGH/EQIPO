const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
  return token.toString();
};

const verifyToken = async(req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ errMessage: "Authorization token not found!" });

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    await jwt.verify(token, process.env.JWT_SECRET, async(err, verifiedToken) => {
      if (err)
        return res
          .status(401)
          .send({ errMessage: "Authorization token invalid", details: err });
      const user = await userModel.findById(verifiedToken.id);
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        errMesage: "Internal server error occured!",
        details: error.message,
      });
  }
};
const authMiddleware = (req, res, next) => {
    // Récupération du token d'authentification depuis les headers de la requête
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    // Vérification si le token existe
    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }
  
    try {
      // Vérification de la validité du token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token d\'authentification invalide' });
    }
  };
  

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware
};
