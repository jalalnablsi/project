const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// تسجيل الدخول عبر تليجرام
router.post('/login', authController.telegramLogin);

// التحقق من الجلسة
router.get('/session', authMiddleware, authController.checkSession);

module.exports = router;