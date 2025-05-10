import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // read token from cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalid' });
    }
    req.user = user; // Attach user info to request
    next(); // Continue to controller
  });
};
