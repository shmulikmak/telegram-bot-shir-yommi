const TelegramBot = require('node-telegram-bot-api');
const TLtoken = '522835661:AAHQ7rWuRnoDRwp0C3O3rInOng1U7vBSYbU';
const bot = new TelegramBot(TLtoken, { polling: true });
var request = require('request');
const ACCESS_TOKEN = 'AIzaSyCV8dE5xU8w0T8F6LxBB78n_BaTUfrUyRE'; // google api token

/*
* start message
*/
const shirYommi = 'תזמון שיר יומי';
const randomShir = 'שיר אקראי';
bot.onText(/\/start/, (msg) => {

    const welcome = `
    היי ${msg.from.first_name}, ברוכים הבאים לשיר יומי.
    המערכת כרגע בהרצה.
    בחר/י מתוך התפריט את הפעולה הרצויה`;

    bot.sendMessage(msg.chat.id, welcome, {
        "reply_markup": {
            "keyboard": [[randomShir], [shirYommi]]
        }
    });

});

/*
* any message goas here
*/
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // shir yommi
    if (msg.text.toString().toLowerCase().indexOf(shirYommi) === 0) {
        bot.sendMessage(msg.chat.id, "shirrrr");
    }

    // random song
    if (msg.text.toString().toLowerCase().indexOf(randomShir) === 0) {

        request.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLsg8dI-9laDnMNkNoFWt_Jy9_KpZcW_kt&key=' + ACCESS_TOKEN, (err, header, body) => {
            if (err) throw err;
            let obj = JSON.parse(body);
            let videoId = obj.items.map(item => item.snippet.resourceId.videoId);
            const randomVideoId = videoId[Math.floor(Math.random() * videoId.length)];
            bot.sendMessage(msg.chat.id, `https://www.youtube.com/watch?v=${randomVideoId}`);
        });
    }

    const bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
});