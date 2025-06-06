// api/gpt.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
    }
  
    const { text } = req.body;
  
    // ✅ 환경변수에서 API 키 불러오기
    const apiKey = process.env.OPENAI_API_KEY;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '너는 감정 분석가야. 아래 대화 내용을 분석해서 두 인물의 심리 상태를 요약해줘. 감정 키워드도 포함해줘.'
          },
          {
            role: 'user',
            content: text
          }
        ]
      })
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  