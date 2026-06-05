const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authenticated — no token' });
    }

    const token = header.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: 'Token expired or invalid — please log in again' });
    }

    // Attach user info to request
    req.user = decoded; // { id?, email, role }
    next();
  } catch (err) {
    next(err);
  }
};

// Only allow admin role
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied — admins only' });
  }
  next();
};

module.exports = { protect, adminOnly };