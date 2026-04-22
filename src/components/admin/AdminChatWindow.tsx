import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, PackagePlus } from 'lucide-react';
import type { Message, Product } from '../../types';
import { MessageBubble } from '../MessageBubble';
import { mockProducts } from '../../data/mockData';

interface Props {
  customer: { id: string; name: string };
  messages: Message[];
  onSendMessage: (content: string, products?: Product[]) => void;
}

export const AdminChatWindow: React.FC<Props> = ({ customer, messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, customer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleSendProducts = () => {
    onSendMessage('Gửi bạn tham khảo một số mẫu này nhé:', mockProducts);
  };

  return (
    <div className="admin-chat-window">
      <div className="chat-window-header glass">
        <h3>{customer.name}</h3>
        <span className="status">Online</span>
      </div>
      
      <div className="chat-messages">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} onAddToCart={() => {}} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container glass">
        <div className="chat-actions">
          <button title="Gửi ảnh"><Image size={20} /></button>
          <button title="Gửi thẻ sản phẩm" onClick={handleSendProducts}><PackagePlus size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Nhập tin nhắn hỗ trợ..." 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-send"><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
};
