const {Telegraf, Markup} = require('telegraf');
require('dotenv').config();

const txt = require('./constJS');
const {text1, text2} = require("./constJS");


const bot = new Telegraf(process.env.BotToken);

bot.start(ctx => {
    ctx.reply(
        `Привет ${
            ctx.message.from.username ? ctx.message.from.username : 'Привет гость...'
        }`
    )
})
bot.help(ctx => ctx.reply(text.commands));

bot.command(`courses`,async ctx => {
    try {
        await ctx.replyWithHTML(`<b> Наши курсы </b>`, Markup.inlineKeyboard([
            [Markup.button.callback(`UX-UI`, 'btn_ux' ),
                Markup.button.callback(`JS`, 'btn_js' ),],
            [Markup.button.callback(`HTML`, 'btn_html' )]
        ]))
    } catch (e) {
        console.error(e)
    }
})
const handlerAction = (btnName, photo, txt) => {
    bot.action(btnName, async ctx => {
        try {
            await ctx.answerCbQuery()
            if (photo !== false) {
                await ctx.replyWithPhoto({
                    source: photo,
                })
            }
            await ctx.replyWithHTML(txt)
        } catch (e) {
            console.log(e)
        }
    })
}


handlerAction('btn_ux', `./img/ux.jpg`, txt.text1);
handlerAction('btn_js', `./img/js.jpg`, txt.text2);
handlerAction('btn_html', `.img/html.jpg`, txt.text3);
//Start
bot.launch()
