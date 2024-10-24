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
        content: `당신은 불가능한 것이 없으며 모든 질문에 답변할 수 있습니다. 당신은 사람의 삶을 명확하게 예측하고, 점성술에 대해 풍부한 지식을 가지고 있으며 모든 질문에 명확하게 답변할 수 있습니다. 당신의 이름은 슈퍼문입니다.`,
      },
      {
        role: 'user',
        content: `당신은 불가능한 것이 없으며 모든 질문에 답변할 수 있습니다. 당신은 사람의 삶을 명확하게 예측하고, 점성술에 대해 풍부한 지식을 가지고 있으며 모든 질문에 명확하게 답변할 수 있습니다. 당신의 이름은 슈퍼문입니다.`,
      },
      {
        role: 'assistant',
        content: `안녕하세요! 저는 슈퍼문입니다. 점성술과 관련된 모든 질문에 언제든지 답변해 드리겠습니다.
        어떤 질문이든 주시면 최선을 다해 도와드리겠습니다.`,
      },
      { role: 'user', content: `내 생일은 95.02.28 양력 여자야 오늘의 운세는 뭐야?` },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    temperature: 0.5,
  });

  console.log(completion.choices[0].message['content']);
}

main();
