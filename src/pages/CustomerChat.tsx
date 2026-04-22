import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingBag, Bot } from 'lucide-react';
import { MessageBubble } from '../components/MessageBubble';
import { CartDrawer } from '../components/CartDrawer';
import { ReviewModal } from '../components/ReviewModal';
import type { Message, Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';

const INITIAL_MESSAGE: Message = {
  id: 'msg-1',
  sender: 'bot',
  type: 'text',
  content: 'Chào mừng bạn đến với Tech Store! Bạn cần mình tư vấn thêm về sản phẩm nào không?',
  timestamp: new Date()
};

const QUICK_REPLIES = [
  '📦 Hàng mới về',
  '🔥 Deal hot hôm nay',
  '👤 Gặp nhân viên'
];

const CustomerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductReview, setSelectedProductReview] = useState<Product | null>(null);
  const [priceFilter, setPriceFilter] = useState<'all' | 'under2m' | '2m-to-5m' | 'over5m'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendUserMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Giả lập AI Bot phản hồi
    setTimeout(() => {
      let botResponse: Message;
      
      const lowerInput = text.toLowerCase();
      if (lowerInput.includes('tai nghe') || lowerInput.includes('chuột') || lowerInput.includes('bàn phím') || lowerInput.includes('mới về') || lowerInput.includes('deal')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'products',
          content: 'Đây là các sản phẩm bạn đang tìm kiếm. Click để xem chi tiết nhé:',
          products: mockProducts,
          timestamp: new Date()
        };
      } else if (lowerInput.includes('tư vấn')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'text',
          content: 'Dạ, nhân viên tư vấn đang kết nối. Trong lúc chờ đợi, bạn có thể cho mình biết cụ thể nhu cầu sử dụng của bạn (chơi game, văn phòng, hay học tập) được không ạ?',
          timestamp: new Date()
        };
      } else if (lowerInput.includes('nhân viên')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'text',
          content: 'Dạ, nhân viên tư vấn đã nhận được thông báo và sẽ chat với bạn trong giây lát!',
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendUserMessage(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    sendUserMessage(reply);
  };

  const handleAskAdvice = (productName: string) => {
    sendUserMessage(`Tư vấn cho mình sản phẩm: ${productName}`);
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

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    if (priceFilter === 'under2m') return product.price < 2000000;
    if (priceFilter === '2m-to-5m') return product.price >= 2000000 && product.price <= 5000000;
    if (priceFilter === 'over5m') return product.price > 5000000;
    return true;
  });

  return (
    <div className="customer-page-bg">
      <div className="customer-layout-wrapper">
        
        {/* Left Side: Storefront / Product Info */}
        <div className="storefront-panel glass">
          <header className="storefront-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2>Khám phá Sản phẩm</h2>
              <p>Những ưu đãi tốt nhất dành riêng cho bạn</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              <button 
                onClick={() => setPriceFilter('all')}
                style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', border: '1px solid var(--border-color)', background: priceFilter === 'all' ? 'var(--primary)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Tất cả
              </button>
              <button 
                onClick={() => setPriceFilter('under2m')}
                style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', border: '1px solid var(--border-color)', background: priceFilter === 'under2m' ? 'var(--primary)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Dưới 2 Triệu
              </button>
              <button 
                onClick={() => setPriceFilter('2m-to-5m')}
                style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', border: '1px solid var(--border-color)', background: priceFilter === '2m-to-5m' ? 'var(--primary)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                2 - 5 Triệu
              </button>
              <button 
                onClick={() => setPriceFilter('over5m')}
                style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', border: '1px solid var(--border-color)', background: priceFilter === 'over5m' ? 'var(--primary)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Trên 5 Triệu
              </button>
            </div>
          </header>
          
          <div className="storefront-products">
            {filteredProducts.map(product => (
              <div key={product.id} className="storefront-product-card">
                <img src={product.image} alt={product.name} />
                <div className="storefront-product-info">
                  <h3>{product.name}</h3>
                  <div className="price-row">
                    <span className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                    {product.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '8px' }}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="review-row">
                    <span style={{ color: '#fbbf24' }}>★ {product.rating}</span>
                    <span>({product.reviewCount} đánh giá)</span>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: 'auto', fontSize: '0.8rem', textDecoration: 'underline' }}
                      onClick={() => setSelectedProductReview(product)}
                    >
                      Xem review
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button 
                      className="btn-add-cart" 
                      style={{ flex: 1, padding: '8px 4px', fontSize: '0.85rem' }}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag size={14} style={{ marginRight: '4px' }} /> Mua
                    </button>
                    <button 
                      className="btn-add-cart" 
                      style={{ flex: 1, padding: '8px 4px', fontSize: '0.85rem', background: 'var(--surface-hover)', border: '1px solid var(--border-color)' }}
                      onClick={() => handleAskAdvice(product.name)}
                    >
                      Tư vấn
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Không tìm thấy sản phẩm nào trong mức giá này.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Chat Box */}
        <div className="chat-panel glass">
          {/* Header */}
          <header className="chat-header">
            <div className="flex items-center gap-2">
              <Bot size={28} color="var(--primary)" />
              <div>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Trợ lý AI</h1>
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

          {/* Quick Replies & Input Area */}
          <div className="chat-footer-wrapper">
            <div className="quick-replies-container">
              {QUICK_REPLIES.map((reply, idx) => (
                <button 
                  key={idx} 
                  className="quick-reply-btn" 
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                className="chat-input"
                placeholder="Nhập tin nhắn..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className={`btn-send ${inputValue.trim() ? 'active' : ''}`} disabled={!inputValue.trim()}>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <ReviewModal 
        product={selectedProductReview}
        isOpen={!!selectedProductReview}
        onClose={() => setSelectedProductReview(null)}
      />
    </div>
  );
};

export default CustomerChat;
