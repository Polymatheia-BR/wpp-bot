const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
	authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
	qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
	console.log('O Cliente está pronto!');
});

client.on('message_create', async (msg) => {
	if(msg.body === '!i' && msg.hasMedia ) {
		const media = await msg.downloadMedia(); 
		client.sendMessage(msg.from, media, {sendMediaAsSticker: true});
	}
});

client.initialize();
