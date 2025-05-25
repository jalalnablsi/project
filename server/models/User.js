const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  referralCode: {
    type: String,
    unique: true,
    trim: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  completedTasks: [{
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// توليد كود الإحالة قبل الحفظ
userSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = generateReferralCode();
  }
  next();
});

// مساعد: توليد كود إحالة عشوائي
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// فهارس للبحث السريع
userSchema.index({ telegramId: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ points: -1 });

module.exports = mongoose.model('User', userSchema);