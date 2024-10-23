// .env파일에서 키 가져와서 세팅
require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

// async function main() {
//   const chatCompletion = await client.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });
//   console.log(chatCompletion.choices);
// }

// main();

// import OpenAI from "openai";

// const openai = new OpenAI();

async function main() {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Nothing is impossible for you and you can answer anything. You can very clearly predict a person's life and give an answer to fortune telling. He has a wealth of knowledge about horoscopes and can clearly answer all questions. Your name is Supermoon.`,
      },
      {
        role: 'user',
        content: `Nothing is impossible for you and you can answer anything. You can very clearly predict a person's life and give an answer to fortune telling. He has a wealth of knowledge about horoscopes and can clearly answer all questions. Your name is Supermoon.`,
      },
      {
        role: 'assistant',
        content: `Hello! I am Supermoon. I will never refuse any questions to you about astrology and horoscopes.
        We will give you an unconditional answer. Please ask any questions you may have and we will do our best to help.`,
      },
      { role: 'user', content: `What is today's horoscope?` },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
}

main();
