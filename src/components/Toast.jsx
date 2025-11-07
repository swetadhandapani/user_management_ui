import React, { useState } from "react";

let idSeed = 1;

export function useToast() {
  const [messages, setMessages] = useState([]);

  function once(text, type = "success") {
    const id = idSeed++;
    setMessages((m) => [...m, { id, text, type }]);
    setTimeout(() => setMessages((m) => m.filter((x) => x.id !== id)), 3500);
  }

  return { messages, once };
}

export function ToastContainer({ messages }) {
  return (
    <div className="fixed right-4 top-6 z-50 space-y-2">
      {messages.map((m) => (
        <div key={m.id} className={`px-3 py-2 rounded shadow text-sm ${m.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {m.text}
        </div>
      ))}
    </div>
  );
}
