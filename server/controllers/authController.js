const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── Helper: sign JWT ──────────────────────────────────────────
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/register
// Public — create a new regular user account
// ─────────────────────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Block registering with the admin email (stored in .env)
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    if (email.toLowerCase().trim() === adminEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }

    // Check duplicate
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user (password hashed by pre-save hook)
    const user  = await User.create({ name, email, password, role: 'user' });
    const token = signToken({ id: user._id, role: 'user' });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/auth/login
// Public — works for both admin (.env) and regular users (DB)
// ─────────────────────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const normalEmail = email.toLowerCase().trim();

    // ── Check admin credentials from .env ────────────────────
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const adminPass = process.env.ADMIN_PASSWORD || '';

    if (normalEmail === adminEmail) {
      if (password !== adminPass) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      let adminUser = await User.findOne({ email: normalEmail });

      if (!adminUser) {
        adminUser = await User.create({
          name: 'Admin',
          email: normalEmail,
          password: adminPass,
          role: 'admin',
        });
      }

      const token = signToken({
        id: adminUser._id,
        email: adminUser.email,
        role: 'admin',
      });

      return res.json({
        success: true,
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
        },
      });
    }

    // ── Check regular user in database ───────────────────────
    const user = await User.findOne({ email: normalEmail });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};



// ─────────────────────────────────────────────────────────────
// GET /api/auth/me
// Protected — returns current user info from token
// ─────────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    // ── Admin user ───────────────────────────────────────────
    if (req.user.role === 'admin') {
      const adminUser = await User.findById(req.user.id).select('-password');

      return res.json({
        success: true,
        user: {
          id: adminUser?._id || req.user.id,
          name: adminUser?.name || 'Admin',
          email: adminUser?.email || req.user.email,
          role: 'admin',
        },
      });
    }

    // ── Normal user ──────────────────────────────────────────
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};