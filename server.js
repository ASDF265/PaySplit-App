const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Key de Neynar. OBTENLA EN https://neynar.com
const NEYNAR_API_KEY = 'NEYNAR_API_KEY';

// Dirección del contrato PaySplit en la red Base Sepolia
const PAY_SPLIT_CONTRACT_ADDRESS = 'PAY_SPLIT_CONTRACT_ADDRESS';

app.get('/', (req, res) => {
    res.send('PaySplit Farcaster Frame API is running!');
});

app.post('/api/frame', async (req, res) => {
    try {
        const { untrustedData } = req.body;
        const fid = untrustedData.fid;
        const buttonIndex = untrustedData.buttonIndex;

        // Validar la interacción del Frame con Neynar
        const verificationResponse = await axios.get(
            `https://api.neynar.com/v2/farcaster/frame/validate?fid=${fid}&hash=${untrustedData.messageHash}`, {
                headers: {
                    'api_key': NEYNAR_API_KEY
                }
            }
        );

        if (!verificationResponse.data.valid) {
            return res.status(400).json({ error: 'Invalid frame interaction' });
        }

        let responseFrame;

        if (buttonIndex === 1) {
            // Generar el siguiente Frame para dividir la cuenta
            responseFrame = {
                title: "Dividir una Cuenta",
                image_url: "https://your-frame-image.com/divide.png",
                input_placeholder: "Ingresa los handles (@user1, @user2)",
                button_1: "Continuar"
            };
        } else if (buttonIndex === 2) {
            // Aquí iría la lógica para enviar la transacción a la blockchain
            // Por ahora, es solo un placeholder
            responseFrame = {
                title: "Transacción en Progreso...",
                image_url: "https://your-frame-image.com/loading.gif",
                button_1: "Ver en Basescan"
            };
        }

        res.json(responseFrame);

    } catch (error) {
        console.error('Error handling frame interaction:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});