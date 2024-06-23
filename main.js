const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (message) => {
    if (message.body === '!sticker' || message.body === '!s') {
        if (!message.hasMedia) {
            message.reply("ERRO! Você precisa anexar uma imagem ou GIF junto ao comando.")
            return
        }
        const media = await message.downloadMedia();
        message.reply(media,undefined,{sendMediaAsSticker: true})
    }
});

client.initialize();