const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for your React app
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/users?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema and model for your data
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  image: String, // Store the image URL or file path
});
const Data = mongoose.model('Data', dataSchema);

// Set up file upload using Multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Define your API endpoint for form submission
app.post('/api/submit-form', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const image = `/uploads/${req.file.filename}`; // Store the image file path

    const newData = new Data({ name, email, phone, image });
    await newData.save();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve uploaded images
// app.use('/uploads', express.static('uploads'));
// Serve uploaded images
app.use('/uploads', express.static('uploads'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const app = express();

// // Enable CORS for your React app
// app.use(cors());

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/users?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Create a schema and model for your data
// const dataSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   image: String,
// });
// const Data = mongoose.model('Data', dataSchema);

// // Set up file upload using Multer
// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// // Define your API endpoint for form submission
// app.post('/api/submit-form', upload.single('image'), async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
//     const image = req.file.filename;

//     const newData = new Data({ name, email, phone, image });
//     await newData.save();

//     res.status(200).json({ message: 'Data saved successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
