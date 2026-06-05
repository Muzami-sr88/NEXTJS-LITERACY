const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${req.method}] ${req.originalUrl}`, err.message);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message).join(', '),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({ success: false, message: `${field} already exists` });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  });
};

module.exports = errorHandler;
