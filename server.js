const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Activity = require('./Activity'); // Import the Activity schema

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access the backend

const PORT = 5000;
// const MONGO_URI = 'mongodb://localhost:27017/FreshTakesDelicacies';
const MONGO_URI = 'mongodb+srv://Pomy:Pomy123@callcenter.f7ows.mongodb.net/FreshTakesDelicacies?retryWrites=true&w=majority';

// 🔹 Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });

// 🔹 GET: Fetch All Menu Items
app.get('/menu', async (req, res) => {
    try {
        const menuCollection = mongoose.connection.collection('Menu'); // Explicit collection name
        const menuItemsCursor = menuCollection.find({}); // Fetch all documents
        const menuItems = await menuItemsCursor.toArray(); // Convert to array

        // Convert binary image data to Base64
        const updatedMenuItems = menuItems.map((item) => ({
            _id: item._id,
            dish: item.dish,
            category: item.category,
            price: item.price.toString(), // Convert Decimal128 to string
            time: item.time,
            description: item.description,
            image: item.image ? `data:image/jpeg;base64,${item.image.toString('base64')}` : null
        }));

        res.json(updatedMenuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Error fetching menu items' });
    }
});

// 🔹 POST: Save Activity Data
app.post('/api/activities', async (req, res) => {
    try {
        const { detail, timestamp, pageName } = req.body;

        const activity = new Activity({ detail, timestamp, pageName });
        await activity.save();

        res.status(201).json({ message: 'Activity saved successfully!', activity });
    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(400).json({ message: error.message });
    }
});

// 🔹 GET: Fetch All Activities
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error retrieving activities:', error);
        res.status(500).json({ message: 'Error retrieving activities!', error });
    }
});
