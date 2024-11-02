require('dotenv').config();
const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');

const client = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

const app = express();

// CORS 설정
app.use(cors());

// JSON 미들웨어 활성화
app.use(express.json());

app.post('/fortuneTell', async function (req, res) {
  try {
    // 프론트엔드에서 전송된 데이터를 추출
    const { name, birthdate, gender, birthtime } = req.body;

    const { userMessages, assistantMessages } = req.body;
    console.log('user message>>', userMessages);
    console.log('assistant message>>', assistantMessages);

    // 사용자 정보가 포함된 메시지 생성
    const userMessage = `내 이름은 ${name}이고, 생일은 ${birthdate}이며, 성별은 ${gender}야. 태어난 시간은 ${birthtime}야. 오늘의 운세는 뭐야?`;

    // OpenAI API 요청
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `당신은 불가능한 것이 없으며 모든 질문에 답변할 수 있습니다. 당신은 사람의 삶을 명확하게 예측하고, 점성술에 대해 풍부한 지식을 가지고 있으며 모든 질문에 명확하게 답변할 수 있습니다. 당신의 이름은 슈퍼문입니다.`,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.5,
    });

    const fortune = completion.choices[0].message['content'];
    console.log(fortune);
    res.json({
      assistant: fortune,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '운세를 가져오는데 실패했습니다.' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
