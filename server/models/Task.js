const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 1
  },
  type: {
    type: String,
    enum: ['telegram', 'twitter', 'instagram', 'general'],
    required: true
  },
  actionUrl: {
    type: String,
    required: function() {
      return ['twitter', 'instagram'].includes(this.type);
    }
  },
  channelId: {
    type: String,
    required: function() {
      return this.type === 'telegram';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// فهارس للبحث السريع
taskSchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model('Task', taskSchema);