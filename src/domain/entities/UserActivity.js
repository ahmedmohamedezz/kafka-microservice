const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userActivitySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  metadata: {
    type: Object,
    default: {}
  }
});

// indices
userActivitySchema.index({userId: 1});
userActivitySchema.index({timestamp: -1});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;