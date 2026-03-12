import jwt from 'jsonwebtoken';
import {prisma} from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.users.findUnique(
        { where: { id: decoded.id } 
      });
      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      res.status(401).json(
        { message: 'Invalid token, authorization denied' }
      );
    }
  } else {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

}

export default authMiddleware;