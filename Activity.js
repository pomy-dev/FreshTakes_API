const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pageName: {
    type: String,
    required: true,
  },
});

// Ensure you are exporting the model correctly
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;