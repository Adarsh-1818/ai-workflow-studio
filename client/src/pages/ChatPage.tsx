import { useState } from "react";
import api from "../api/axios";
import { useChatStore } from "../store/chatStore";
import AppLayout from "../components/AppLayout";

const ChatPage = () => {
  const {
    currentChatId,
    setCurrentChatId,
    messages,
    setMessages,
    addMessage,
  } = useChatStore();

  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  // CREATE NEW CHAT
  const createNewChat = async () => {
    const res = await api.post("/chat/new", {
      userId: "demo-user",
      title: "New Chat",
    });

    setChats((prev) => [...prev, res.data]);

    setCurrentChatId(res.data.id);

    setMessages([]);
  };

  // LOAD CHAT MESSAGES
  const loadMessages = async (chatId: string) => {
    const res = await api.get(`/chat/${chatId}`);

    setMessages(res.data);

    setCurrentChatId(chatId);
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!currentChatId) return;

    addMessage({
      role: "user",
      content: prompt,
    });

    const res = await api.post("/chat/message", {
      chatId: currentChatId,
      prompt,
    });

    addMessage({
      role: "ai",
      content: res.data.response,
    });

    setPrompt("");
  };

  return (
    <AppLayout>
    <div className="h-screen flex bg-slate-950 text-white">

      {/* SIDEBAR */}
      <div className="w-[300px] bg-slate-900 p-4 border-r border-slate-800">
        
        <button
          onClick={createNewChat}
          className="w-full bg-violet-600 p-3 rounded-lg mb-4"
        >
          + New Chat
        </button>

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => loadMessages(chat.id)}
              className="p-3 rounded bg-slate-800 cursor-pointer hover:bg-slate-700"
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] p-4 rounded-xl ${
                msg.role === "user"
                  ? "ml-auto bg-violet-600"
                  : "bg-slate-800"
              }`}
            >
              {msg.content}
            </div>
          ))}

        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-slate-800 flex gap-3">

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 bg-slate-800 p-3 rounded-lg"
          />

          <button
            onClick={sendMessage}
            className="bg-violet-600 px-6 rounded-lg"
          >
            Send
          </button>

        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default ChatPage;