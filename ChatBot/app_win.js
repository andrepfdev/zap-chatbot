//////////////////////////////////////////////////////
// ** Mensagens do Chabot **
//////////////////////////////////////////////////////


async function chatBot() {

  client.on('message', async msg => {
    const lowerCaseBody = msg.body.toLowerCase();

    if (lowerCaseBody === 'teste' || lowerCaseBody === 'oi') {
      await delay(2000);
      await sendMessage(msg.from, 'Olá, este é um robô inteligente!');
      await delay(3000);
      await sendMessage(msg.from, 'Vou enviar uma imagem e um áudio para explicar melhor.');
      await delay(5000);
      await sendFile(msg.from, './imagem.png');
      await sendFile(msg.from, './audio.ogg', 'audio');

      //await sendFile(msg.from, './video1.m4v', 'video');

      await delay(8000);

      await sendMessage(msg.from, '*Escolha umas das opções:*');
      await sendMessage(msg.from, '1. Opção A.');
      await sendMessage(msg.from, '2. Opção B.');
      await sendMessage(msg.from, '3. Opção C.');
    }

    if (msg.body === '1' || msg.body === 'Opção A' || msg.body === 'Opção a') {
      await sendMessage(msg.from, 'Você escolheu a opção A.');
      await sendMessage(msg.from, 'https://google.com');
    } else if (msg.body === '2') {
      await sendMessage(msg.from, 'Você escolheu a opção B.');
    } else if (msg.body === '3') {
      await sendMessage(msg.from, 'Você escolheu a opção C.');
    }
  });

};

//////////////////////////////////////////////////////
// ** Config do Chabot **
//////////////////////////////////////////////////////

const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
// A dependência do puppeteer foi removida (não é necessária no Windows)
// const puppeteer = require('puppeteer');

// Opções não necessárias no Windows, substituídas pelo comportamento padrão
const client = new Client();

// Leitura do qrcode
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('>>>> WhatsApp conectado. Modo: ativo');
});

// Função de atraso
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ... resto do seu código usando o objeto client ...

client.initialize();
chatBot();


//////////////////////////////////////////////////////
// ** Funções do Chabot **
//////////////////////////////////////////////////////

// Função para enviar mensagens (melhorada com objeto de mensagem)
async function sendMessage(to, message) {
  const chat = await getChatById(to);
  await chat.sendStateTyping();
  await delay(1000);
  return await chat.sendMessage(message); // Use o método sendMessage diretamente
}

// Função para enviar arquivos
async function sendFile(to, filePath, type = 'image') {
  const chat = await getChatById(to);
  const media = MessageMedia.fromFilePath(filePath, type);
  await chat.sendStateRecording();
  await delay(2000);
  return await chat.sendMessage(media); // Use o método sendMessage diretamente
}

// Função para recuperar o chat por ID
async function getChatById(id) {
  const chat = await client.getChatById(id); // Use o método built-in do client
  return chat;
}

