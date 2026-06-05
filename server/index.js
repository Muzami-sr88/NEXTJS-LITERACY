const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const compression = require('compression');
const connectDB  = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.1.247:3000',
  'https://nextjs-literacy-weld.vercel.app',
  'https://nextjs-literacy-nphh-9tf8iuein-muzamil-s-projects3.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '1mb' }));

// ── Models (needed to register schemas before routes)
const Literature          = require('./models/Literature');
const LiteraryTerm        = require('./models/LiteraryTerm');
const WorldLiterature     = require('./models/WorldLiterature');
const CriticalPerspective = require('./models/CriticalPerspective');
const bookmarkRoutes = require("./routes/bookmarkRoutes");

// ── Route factory
const makeRouter = require('./routes/contentRouter');

// ── Routes
app.use('/api/auth',                  require('./routes/auth'));
app.use('/api/search',                require('./routes/search'));
app.use('/api/literature',            require('./routes/Literatures'));       // existing file kept
app.use('/api/literary-terms',        makeRouter(LiteraryTerm));
app.use('/api/world-literature',      makeRouter(WorldLiterature));
app.use('/api/critical-perspectives', makeRouter(CriticalPerspective));
app.use("/api/bookmarks", bookmarkRoutes);

// ── Health check
app.get('/api/health', (_, res) => res.json({ ok: true, time: new Date() }));
app.get('/',(req,res)=>{
    res.send("work")
})
// ── Error handler
app.use(require('./middleware/errorHandler'));

module.exports = app;
