const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    authStrategy: new LocalAuth()
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
            message.react("❌")
            message.reply("ERRO! Você precisa anexar uma imagem ou GIF junto ao comando.")
            return
        }
        message.react("✅")
        const media = await message.downloadMedia();
        message.reply(media,undefined,{sendMediaAsSticker: true})
    }
});

client.initialize();