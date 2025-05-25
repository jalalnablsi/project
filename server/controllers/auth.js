const jwt = require('jsonwebtoken');
const User = require('../models/User');

// تسجيل الدخول/التسجيل عبر تليجرام
exports.telegramLogin = async (req, res) => {
  try {
    const { id, username, first_name, last_name, photo_url, auth_date, hash, ref } = req.body;

    // التحقق من توقيع تليجرام (يجب تطبيقه)
    if (!isValidTelegramData({ id, auth_date, hash })) {
      return res.status(401).json({ error: 'Invalid Telegram data' });
    }

    // البحث عن مستخدم موجود أو إنشاء جديد
    let user = await User.findOne({ telegramId: id });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = new User({
        telegramId: id,
        username,
        firstName: first_name,
        lastName: last_name,
        photoUrl: photo_url,
        points: ref ? 50 : 0, // نقاط ترحيبية للمستخدمين الجدد
      });

      // معالجة الإحالة إذا وجدت
      if (ref) {
        const referrer = await User.findOne({ referralCode: ref });
        if (referrer && referrer.telegramId !== id) {
          user.referredBy = referrer._id;
          referrer.points += 100; // 100 نقطة للمُحيل
          referrer.referrals.push(user._id);
          await referrer.save();
        }
      }

      await user.save();
    }

    // إنشاء JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: user._id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        points: user.points,
        referralCode: user.referralCode,
        isNewUser
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// التحقق من الجلسة
exports.checkSession = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// مساعد: التحقق من بيانات تليجرام
function isValidTelegramData({ id, auth_date, hash }) {
  // يجب تطبيق التحقق الفعلي هنا
  // يمكنك استخدام crypto لإنشاء hash ومقارنته
  return true; // مؤقت للاختبار
}