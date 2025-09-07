require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Configuración para la red de prueba de Base Sepolia
    baseSepolia: {
      url: `https://sepolia.base.org`,
      // Asegúrate de que la clave privada esté en tu archivo .env
      // O usa una cuenta de prueba para la hackathon
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      // Clave de API para el explorador de bloques de Base
      baseSepolia: process.env.BASESCAN_API_KEY
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/"
        }
      }
    ]
  },
  // La ruta de tu contrato
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
