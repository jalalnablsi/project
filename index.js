const { Bot } = require("grammy");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

// Initialize the bot
const bot = new Bot(process.env.BOT_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Command: /start
bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || "unknown";

  // Check if user exists
  let user = await User.findOne({ userId });
  if (!user) {
    // Create a new user with a referral code
    const referralCode = generateReferralCode();
    user = new User({ userId, username, referralCode, balance: 0 });
    await user.save();
  }

  // Check if the user was referred by someone
  const referrerCode = ctx.message.text.split(" ")[1];
  if (referrerCode && referrerCode !== user.referralCode) {
    const referrer = await User.findOne({ referralCode: referrerCode });
    if (referrer) {
      // Reward both the referrer and the new user
      referrer.balance += 50; // Referrer gets 50 coins
      user.balance += 50; // New user gets 50 coins
      await referrer.save();
      await user.save();

      ctx.reply(`🎉 You have been referred by @${referrer.username}! You and your referrer received 50 coins each.`);
    }
  }

  // Welcome message
  ctx.reply(
    `👋 Welcome to the Airdrop Bot!\n\nYour referral link: https://t.me/ ${ctx.me.username}?start=${user.referralCode}\n\nYour balance: ${user.balance} coins`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Follow us on Twitter", url: "https://twitter.com/your_account " }],
          [{ text: "Follow us on Instagram", url: "https://instagram.com/your_account " }],
          [{ text: "Check Balance", callback_data: "check_balance" }]
        ]
      }
    }
  );
});

// Handle button clicks
bot.callbackQuery("check_balance", async (ctx) => {
  const userId = ctx.from.id;
  const user = await User.findOne({ userId });
  if (user) {
    ctx.answerCallbackQuery(`Your balance: ${user.balance} coins`);
  } else {
    ctx.answerCallbackQuery("You are not registered yet.");
  }
});

// Start the bot
bot.start();