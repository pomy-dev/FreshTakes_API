const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const mongoose = require('mongoose');
const Activity = require('./Activity');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access the backend
const PORT = 5000;

// MongoDB Connection
MONGO_URL = 'mongodb://localhost:27017/ds';

// API Route to Get Menu Items
app.get('/menu', async (req, res) => {
    try {
        const menuItems = await menuCollection.find().toArray();
        // Convert binary data to Base64
        const updatedMenuItems = menuItems.map(item => ({
            ...item,
            image: item.image ? `data:image/jpeg;base64,${item.image.toString('base64')}` : null
        }));
        res.json(updatedMenuItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching menu items' });
    }
});

app.post('/s', async (req, res) => {
    try {
        const { de } = req.body;
        console.log('ddddd');
        res.status(201).json({ message: 'Activity saved successfully!', activity });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Route to save activity data
app.post('/api/activities', async (req, res) => {
    try {
        const { detail, timestamp, pageName } = req.body;

        const activity = new Activity({
            detail,
            timestamp,
            pageName,
        });

        await activity.save();
        res.status(201).json({ message: 'Activity saved successfully!', activity });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve all activities
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving activities!', error });
    }
});





mongoose
    .connect(MONGO_URL)
    .then(() => {
        app.listen(PORT,
            () => {
                console.log(`Server is listening on http://localhost:${PORT}`);
            });
    })
    .catch(
        (err) => {
            console.log("Error Occurred");
        }
    );