//////////////////////////////////////////////////////
// ** Mensagens do Chabot COM OPÇÕES **
//////////////////////////////////////////////////////


async function chatBot() {

    client.on('message', async msg => {

        if (msg.body === 'Bot' || msg.body === 'Começar' || msg.body === 'Teste') {
            await delay(2000);
            await sendMessage(msg.from, 'Olá! Vamos começar. Me diga qual serviço você precisa:');
            await sendMessage(msg.from, '1. Atendimento ao Cliente\n2. Contabilidade\n3. Suporte Técnico\n4. Recursos Humanos\n5. Sair');
        }

        if (msg.body === '1') {
            await delay(2000);
            await sendMessage(msg.from, 'Com qual tipo de problema você precisa de ajuda no atendimento?');
            await sendMessage(msg.from, '6. Dúvidas sobre produtos ou serviços\n7. Reclamações ou sugestões\n8. Segunda via de fatura\n9. Outros');
        }

        if (msg.body === '2') {
            await delay(2000);
            await sendMessage(msg.from, 'Em qual área da contabilidade você precisa de ajuda?');
            await sendMessage(msg.from, '10. Emissão de notas fiscais\n11. Controle de caixa\n12. Declarações fiscais\n13. Consultoria');
        }

        if (msg.body === '3') {
            await delay(2000);
            await sendMessage(msg.from, 'Qual tipo de problema você está enfrentando com seu equipamento?');
            await sendMessage(msg.from, '14. Computador\n15. Celular\n16. Impressora\n17. Software');
        }

        if (msg.body === '4') {
            await delay(2000);
            await sendMessage(msg.from, 'Com qual área de Recursos Humanos você precisa falar?');
            await sendMessage(msg.from, '18. Recrutamento e Seleção\n19. Treinamento e Desenvolvimento\n20. Benefícios\n21. Folha de Pagamento');
        }

        if (msg.body === '5') {
            await delay(2000);
            await sendMessage(msg.from, 'Até breve! Se precisar de ajuda novamente, estarei aqui.');
        }

    });

};

//////////////////////////////////////////////////////
// ** Config do Chabot **
//////////////////////////////////////////////////////

const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
// Remove puppeteer dependency (not required on Windows)
// const puppeteer = require('puppeteer');

// Options not required on Windows, replaced with default behavior
const client = new Client();

// Leitura do qrcode
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('>>>> WhatsApp conectado. Modo: ativo');
});

// Delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ... rest of your code using client object ...

client.initialize();
chatBot();

