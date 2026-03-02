const cron = require("node-cron");
const Card = require("../models/Card");
const { sendReminder } = require("./emailService");

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  const nextHour = new Date(now.getTime() + 3600000);

  const cards = await Card.find({
    dueDate: { $lte: nextHour, $gte: now },
  });

  for (let card of cards) {
    await sendReminder(
      "user@email.com",
      "Task Reminder",
      `Your task ${card.title} is due soon`
    );
  }
});