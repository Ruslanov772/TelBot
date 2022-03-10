const {Telegraf, Markup} = require('telegraf');
require('dotenv').config();

const text = require('./constJS');

const bot = new Telegraf(process.env.BotToken);

bot.start(ctx => {
    ctx.reply(
        `Привет ${
            ctx.message.from.username ? ctx.message.from.username : 'Привет гость...'
        }`
    )
})
bot.help(ctx => ctx.reply(text.commands));

bot.command(`course`,async ctx => {
    try {
        await ctx.replyWithHTML(`<b> Наши курсы </b>`, Markup.inlineKeyboard([
            [Markup.button.callback(`UX-UI`, 'btn_ux' ),
                Markup.button.callback(`JS`, 'btn_js' ),],
            [Markup.button.callback(`JS`, 'btn_js' )]
        ]))
    } catch (e) {
        console.error(e)
    }
})
//Start
bot.launch()