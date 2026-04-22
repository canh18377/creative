import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminChatList } from '../components/admin/AdminChatList';
import { AdminChatWindow } from '../components/admin/AdminChatWindow';
import { AdminCustomerInfo } from '../components/admin/AdminCustomerInfo';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProducts } from '../components/admin/AdminProducts';
import type { Message, Product, CartItem } from '../types';

export const mockAdminCustomers = [
  { id: 'c1', name: 'Nguyễn Văn A', lastMessage: 'Cho tôi mua tai nghe', time: '10:30', unread: 2, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 'c2', name: 'Trần Thị B', lastMessage: 'Bàn phím này còn hàng không?', time: '09:15', unread: 0, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 'c3', name: 'Lê Hoàng C', lastMessage: 'Đã nhận được hàng', time: 'Hôm qua', unread: 0, avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
];

export const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'products'>('chat');
  const [activeCustomer, setActiveCustomer] = useState(mockAdminCustomers[0]);

  // Dummy messages for admin view
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', sender: 'user', type: 'text', content: 'Cho mình hỏi về tai nghe Sony', timestamp: new Date() },
    { id: 'm2', sender: 'bot', type: 'text', content: 'Dạ shop chào bạn, bạn cần tư vấn dòng tai nghe nào ạ?', timestamp: new Date() }
  ]);

  const [cartItems] = useState<CartItem[]>([]);

  const handleSendMessage = (content: string, products?: Product[]) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      type: products ? 'products' : 'text',
      content,
      products,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'dashboard' && <AdminDashboard />}
      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'chat' && (
        <>
          <AdminChatList
            customers={mockAdminCustomers}
            activeId={activeCustomer.id}
            onSelect={setActiveCustomer}
          />
          <AdminChatWindow
            customer={activeCustomer}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          <AdminCustomerInfo
            customer={activeCustomer}
            cartItems={cartItems}
          />
        </>
      )}
    </div>
  );
};
