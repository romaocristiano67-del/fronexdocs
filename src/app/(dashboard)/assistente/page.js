"use client";

import { useState } from "react";

export default function AssistentePage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Olá! Sou o assistente educacional da Fronex Docs. Como te posso ajudar nos estudos hoje?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: `Recebi a tua dúvida sobre "${currentInput}". Para usar o chat de IA de forma real, a API precisaria de ser implementada com streaming. Queres que eu crie a rota do chat também?` }]);
    }, 1000);
  };

  return (
    <div className="ai-page">
      <div className="page-header px-8 pt-8 pb-4 border-b border-[var(--border)] bg-[var(--black)]">
        <h1 className="page-title text-2xl">Assistente <span>IA</span></h1>
        <p className="page-sub">Ajuda rápida para estudos, correção de textos e dúvidas gerais.</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            <div className={`chat-avatar ${msg.role}`}>
              {msg.role === 'ai' ? '✦' : '👤'}
            </div>
            <div className={`chat-bubble ${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-input-area">
        <textarea 
          className="chat-input" 
          placeholder="Pergunta algo ao assistente..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
        ></textarea>
        <button type="submit" className="chat-send" disabled={!input.trim()}>
          ➤
        </button>
      </form>
    </div>
  );
}