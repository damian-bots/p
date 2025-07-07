// bot/bot.ts
import { Context, Markup, Telegraf } from "telegraf";
import { socialMediaController } from "../controller/socialMediaController";
import { sendFile } from "../utils/index";
import { isValidUrl } from "../regex";
import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  try {
    await ctx.reply(
      `Hi ${ctx.message.from.first_name},\n\nI can Download Files from Terabox.\n\nMade with ❤️ by @DeadlineTechTeam\n\nSend any instagram link to download.`,
      Markup.inlineKeyboard([
        Markup.button.url("📡 Updates", "https://t.me/DeadlineTechTeam"),
        Markup.button.url("👾 Report bug", "https://t.me/deadlineTechSupport"),
      ])
    );
  } catch (e) {
    console.error("Error in start command:", e);
    await ctx.reply("Sorry, an error occurred while processing your request.");
  }
});

bot.on("text", async (ctx: Context) => {
  try {
    if (ctx.message && "text" in ctx.message) {
      console.log("ctx.message-->>", ctx.message);

      const messageText = ctx.message.text;
      console.log("messageText-->>", messageText);

      if (!isValidUrl(messageText)) {
        await ctx.reply(messageText === "hi" ? "Hey there" : "Invalid URL.");
        return;
      }

      await ctx.reply("Processing... Please wait.");
      const response = await axios.get("https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious,racist,sexist&type=single");

      const joke = response.data.joke;

      // Sending the joke to the user
      await ctx.reply(`Here's a little something to make you smile while we process your request: 😄\n\n${joke}`);

      const details = await socialMediaController(messageText);
      console.log("details", JSON.stringify(details, null, 2));

      await ctx.reply("Sending Files Please Wait.!!");
      await sendFile(details, ctx);
    } else {
      await ctx.reply("No message text found.");
    }
  } catch (e) {
    console.error("Error processing message:", e);
    await ctx.reply("An error occurred while processing your request.");
  }
});

bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

export const launchBot = () => {
  bot
    .launch()
    .then(() => {
      console.log("Bot launched successfully");
    })
    .catch((e) => {
      console.error("Error launching bot:", e);
    });
};
