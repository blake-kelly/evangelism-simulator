import { useState } from "react";

export default function Simulator() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Thanks for your message. Here's a thoughtful reply from the AI.");
    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      <h2>Evangelism Simulator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something to start the conversation"
          style={{ width: "70%", marginRight: "1rem" }}
        />
        <button type="submit">Send</button>
      </form>
      {response && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Response:</strong> {response}
        </p>
      )}
    </div>
  );
}