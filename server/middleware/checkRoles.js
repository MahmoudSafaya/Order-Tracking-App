const jwt = require('jsonwebtoken');

const checkRoles = (roles = []) => {
    return (req, res, next) => {
      if (!Array.isArray(roles)) roles = [roles];
  
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = decoded; // Attach user data to the request
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    };
  };
  
  // Usage example
  app.get('/admin', checkRoles(['admin']), (req, res) => {
    res.send('Welcome, admin!');
  });
  