import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingBag, Bot } from 'lucide-react';
import { MessageBubble } from '../components/MessageBubble';
import { CartDrawer } from '../components/CartDrawer';
import type { Message, Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';

const INITIAL_MESSAGE: Message = {
  id: 'msg-1',
  sender: 'bot',
  type: 'text',
  content: 'Chào bạn! Mình là trợ lý mua sắm AI. Bạn đang muốn tìm sản phẩm công nghệ nào hôm nay?',
  timestamp: new Date()
};

const CustomerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Giả lập AI Bot phản hồi
    setTimeout(() => {
      let botResponse: Message;
      
      const lowerInput = userMsg.content.toLowerCase();
      if (lowerInput.includes('tai nghe') || lowerInput.includes('chuột') || lowerInput.includes('bàn phím') || lowerInput.includes('màn hình') || lowerInput.includes('sản phẩm')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'products',
          content: 'Đây là các sản phẩm nổi bật phù hợp với nhu cầu của bạn. Bạn xem thử nhé:',
          products: mockProducts,
          timestamp: new Date()
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'text',
          content: 'Dạ, bạn có thể tham khảo các sản phẩm công nghệ bên mình. Bạn cứ nhắn tên món đồ muốn tìm nhé (VD: chuột, bàn phím, tai nghe...)',
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev => prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCartItems([]);
    
    setTimeout(() => {
      const successMsg: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'checkout_success',
        content: 'Tuyệt vời! Đơn hàng của bạn đã được tiếp nhận.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMsg]);
    }, 500);
  };

  return (
    <>
      <div className="chat-container animate-fade-in">
        {/* Header */}
        <header className="chat-header glass">
          <div className="flex items-center gap-2">
            <Bot size={28} color="var(--primary)" />
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Tech Store AI</h1>
              <span style={{ fontSize: '0.85rem', color: 'var(--success)' }}>● Đang trực tuyến</span>
            </div>
          </div>
          
          <button className="cart-icon-wrapper cursor-pointer" onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', color: 'white' }}>
            <ShoppingBag size={28} />
            {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
          </button>
        </header>

        {/* Message Area */}
        <main className="chat-messages">
          {messages.map(msg => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onAddToCart={handleAddToCart} 
            />
          ))}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        <form className="chat-input-area glass" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            className="chat-input"
            placeholder="Nhập tin nhắn để tìm sản phẩm..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-send" disabled={!inputValue.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default CustomerChat;
