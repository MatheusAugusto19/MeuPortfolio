// ask.js
import { GoogleGenAI } from '@google/genai';

// 1. CARREGAR A CHAVE DE AMBIENTE
// É muito mais seguro carregar a chave de uma variável de ambiente!
// Certifique-se de definir a variável GEMINI_API_KEY no seu sistema.
const apiKey = process.env.GEMINI_API_KEY; 

if (!apiKey) {
  console.error("ERRO: Variável de ambiente GEMINI_API_KEY não definida.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// 2. RECEBER A PERGUNTA
// Pega o argumento da linha de comando (tudo após 'node ask.js')
const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.error("ERRO: Por favor, forneça uma pergunta. Ex: node ask.js 'Como uso Sass em um componente React?'");
  process.exit(1);
}

// 3. FAZER A CHAMADA AO GEMINI
async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo rápido para tarefas de código
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 4. IMPRIMIR A RESPOSTA
    console.log("--- Resposta do Gemini ---");
    console.log(response.text);

  } catch (error) {
    console.error("Ocorreu um erro na chamada ao Gemini:", error.message);
  }
}

run();