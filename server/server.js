import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import orgData from './data/duckData.js';
import rubberDuckRoutes from './routes/rubberDucks.js'; // Import the routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.get('/recommendation', (req, res) => {
  const { recommendations } = req.body;

  // לוגיקה לטיפול בנתונים (למשל חיפוש המלצות במאגר נתונים)
  console.log('Received recommendations:', recommendations);

  // החזרת תגובה ללקוח
  res.status(200).json({ organizations: recommendations });
});

app.get('/api/recommendation/:id', (req, res) => {
  const { id } = req.params;

  // לוגיקה לטיפול בנתונים (למשל חיפוש המלצות במאגר נתונים)
  console.log('rec id', id);
  const recData = orgData[id]

  // החזרת תגובה ללקוח
  res.status(200).json({ data: recData });
});

// Use the routes file for all `/ducks` routes
app.use('/ducks', rubberDuckRoutes);

app.use('/api/ducks', rubberDuckRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
