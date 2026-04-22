import React from 'react';
import { LayoutDashboard, MessageSquare, Package, Settings, LogOut } from 'lucide-react';

interface Props {
  activeTab: 'dashboard' | 'chat' | 'products';
  onTabChange: (tab: 'dashboard' | 'chat' | 'products') => void;
}

export const AdminSidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="admin-sidebar glass">
      <div className="admin-brand">
        <Package size={32} color="var(--primary)" />
      </div>
      
      <nav className="admin-nav">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
          title="Dashboard Thống kê"
        >
          <LayoutDashboard size={24} />
        </button>
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => onTabChange('chat')}
          title="Tin nhắn khách hàng"
        >
          <MessageSquare size={24} />
        </button>
        <button 
          className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => onTabChange('products')}
          title="Quản lý Sản phẩm"
        >
          <Package size={24} />
        </button>
        <button className="nav-item">
          <Settings size={24} />
        </button>
      </nav>
      
      <div className="admin-sidebar-footer">
        <button className="nav-item">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};
