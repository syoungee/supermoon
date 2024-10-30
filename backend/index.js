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

// JSON 및 URL 인코딩 미들웨어 (필요 시 추가)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.post('/fortuneTell', async function (req, res) {
  try {
    // 기본값으로 설정된 메시지
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `당신은 불가능한 것이 없으며 모든 질문에 답변할 수 있습니다. 당신은 사람의 삶을 명확하게 예측하고, 점성술에 대해 풍부한 지식을 가지고 있으며 모든 질문에 명확하게 답변할 수 있습니다. 당신의 이름은 슈퍼문입니다.`,
        },
        {
          role: 'user',
          content: `내 생일은 95.02.28 양력 여자야 오늘의 운세는 뭐야?`,
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
