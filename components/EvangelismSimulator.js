
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function EvangelismSimulator() {
  const [messages, setMessages] = useState([
    {
      role: 'npc',
      content: `Hi, I’m Alex. I’m not really religious. I guess I believe there’s something out there, but I’m not sure what.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/evangelism-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await res.json();

    setMessages([...newMessages, { role: 'npc', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Evangelism Practice Simulator</h1>
      <Card className="h-[400px] overflow-y-scroll p-4 space-y-2">
        <CardContent className="space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-2 max-w-[75%] ${
                m.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100'
              }`}
            >
              <p>{m.content}</p>
            </div>
          ))}
          {loading && <Loader2 className="animate-spin" />}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
}
