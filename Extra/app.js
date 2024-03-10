const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

// Gera QR Code
wppconnect
    .create({
        session: 'sessionName',
        catchQR: (base64Qr, asciiQR) => {
            console.log(asciiQR); // Optional to log the QR in the terminal
            var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');

            var imageBuffer = response;
            require('fs').writeFile(
                'out.png',
                imageBuffer['data'],
                'binary',
                function (err) {
                    if (err != null) {
                        console.log(err);
                    }
                }
            );
        },
        logQR: false,
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));


wppconnect
    .create()
    .then((client) => start(client))
    .catch((error) => console.log(error));


///////////////////////////////////////////////////////
//////////// ** Funções ** 
//////////////////////////////////////////////////////

async function delay(time) {
    try {
        await new Promise((resolve) => setTimeout(resolve, time));
    } catch (error) {
        console.error("Erro durante o delay:", error);
    }
}



///////////////////////////////////////////////////////
//////////// ** Recebendo mensagens ** 
//////////////////////////////////////////////////////


async function start(client) {
    client.onMessage(async (message) => {
        if (message.body === 'Oi' || message.body === 'Teste') {
            // Enviar uma mensagem de texto
            await delay(2000);
            client.sendText(message.from, 'Olá! Seja bem-vindo(a).')

            await delay(3000);
            const imagePath = './imagem.png';
            client.sendImage(message.from, imagePath, 'Imagem Enviada')

            await delay(3000);
            const audioPath = './audio.ogg';
            client.sendFile(message.from, audioPath)

            await delay(10000);
            const videoPath = './video0.mp4';
            client.sendFile(message.from, videoPath, 'video1.m4v')

            await delay(2000);
            client.sendText(message.from, 'Digite: *Obrigado*')

        } else if (message.body === 'Obrigado') {
            client.sendText(message.from, 'Tudo OK até aqui. Tchau!')
        }
    });
}

