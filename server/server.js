import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import orgData from './data/duckData.js'; // Example data (ensure it exists)
import rubberDuckRoutes from './routes/rubberDucks.js'; // Import the routes

dotenv.config();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

// MongoDB connection
const uri = process.env.MONGO_URI;
console.log('Mongo URI:', uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    //process.exit(1); 
  }
}
connectToDB();


// Routes
app.get('/recommendation', (req, res) => {
  const { recommendations } = req.body;

  if (!recommendations) {
    return res.status(400).json({ error: 'No recommendations provided' });
  }

  console.log('Received recommendations:', recommendations);

  res.status(200).json({ organizations: recommendations });
});

app.get('/api/recommendation/:id', (req, res) => {
  const { id } = req.params;

  console.log('rec id', id);

  const recData = orgData[id]; // Replace with actual data fetching logic

  if (!recData) {
    return res.status(404).json({ error: 'Recommendation not found' });
  }

  res.status(200).json({ data: recData });
});

// Use the routes file for all `/ducks` routes
app.use('/ducks', rubberDuckRoutes);

app.post('/api/submit-improvement', async (req, res) => {
  const { improvement } = req.body;

  if (!improvement) {
    return res.status(400).json({ error: 'No improvement provided' });
  }

  try {
    const db = client.db('improve'); // Use your database name
    const collection = db.collection('improvements'); // Collection name

    // Insert the improvement into MongoDB
    const result = await collection.insertOne({ improvement, date: new Date() });

    res.status(200).json({ message: 'Improvement submitted successfully!', result });
  } catch (error) {
    console.error('Error saving improvement to MongoDB', error);
    res.status(500).json({ error: 'Failed to save improvement' });
  }
});

// Start server
const PORT = process.env.PORT; // Default to port 5000 if not provided
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
