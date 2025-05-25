const Task = require('../models/Task');
const User = require('../models/User');

// الحصول على جميع المهام
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// إكمال المهمة
exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userId;

    const task = await Task.findById(taskId);
    if (!task || !task.isActive) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const user = await User.findById(userId);
    if (user.completedTasks.some(t => t.taskId.toString() === taskId)) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    // التحقق من متطلبات المهمة
    if (task.type === 'telegram' && !await checkTelegramMembership(user.telegramId, task.channelId)) {
      return res.status(400).json({ error: 'Join our Telegram channel first' });
    }

    // إضافة النقاط
    user.points += task.points;
    user.completedTasks.push({ taskId });
    await user.save();

    res.json({ 
      points: user.points,
      completedTasks: user.completedTasks.length
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// الحصول على المتصدرين
exports.getLeaderboard = async (req, res) => {
  try {
    const leaders = await User.find()
      .sort({ points: -1 })
      .limit(20)
      .select('username photoUrl points referrals');
      
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// مساعد: التحقق من عضوية التليجرام
async function checkTelegramMembership(telegramId, channelId) {
  // يجب تطبيق التحقق الفعلي باستخدام Telegram API
  return true; // مؤقت للاختبار
}