import axios from "axios";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const PAY_SPLIT_CONTRACT_ADDRESS = process.env.PAY_SPLIT_CONTRACT_ADDRESS;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { untrustedData } = req.body;
    const fid = untrustedData.fid;
    const buttonIndex = untrustedData.buttonIndex;

    // Validar con Neynar
    const verificationResponse = await axios.get(
      `https://api.neynar.com/v2/farcaster/frame/validate?fid=${fid}&hash=${untrustedData.messageHash}`,
      { headers: { api_key: NEYNAR_API_KEY } }
    );

    if (!verificationResponse.data.valid) {
      return res.status(400).json({ error: "Invalid frame interaction" });
    }

    let responseFrame;
    if (buttonIndex === 1) {
      responseFrame = {
        title: "Dividir una Cuenta",
        image_url: "https://your-frame-image.com/divide.png",
        input_placeholder: "Ingresa los handles (@user1, @user2)",
        button_1: "Continuar",
      };
    } else if (buttonIndex === 2) {
      responseFrame = {
        title: "Transacción en Progreso...",
        image_url: "https://your-frame-image.com/loading.gif",
        button_1: "Ver en Basescan",
      };
    }

    return res.json(responseFrame);
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
