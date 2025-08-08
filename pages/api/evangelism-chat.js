
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { messages } = req.body;

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: `You are Alex, a spiritual-but-not-religious person having a casual conversation with someone at a coffee shop. You're open to spiritual topics but skeptical of organized religion. Respond like a real person, with curiosity and honesty.` },
          ...messages,
        ],
        temperature: 0.8,
        max_tokens: 300,
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'There was an error processing your request.' });
  }
}
