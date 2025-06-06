const analyzeBtn = document.getElementById('analyzeBtn');
const conversationInput = document.getElementById('conversation');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

async function analyzeConversation() {
  const text = conversationInput.value.trim();
  if (!text) return alert('대화를 입력해주세요.');

  analyzeBtn.disabled = true;
  loadingDiv.classList.remove('hidden');
  resultDiv.innerText = '';

  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    resultDiv.innerText = data.choices?.[0]?.message?.content || '분석 결과가 없습니다.';
  } catch (error) {
    console.error(error);
    resultDiv.innerText = '오류가 발생했습니다. 다시 시도해주세요.';
  } finally {
    loadingDiv.classList.add('hidden');
    analyzeBtn.disabled = false;
  }
}
analyzeBtn.addEventListener('click', analyzeConversation);
