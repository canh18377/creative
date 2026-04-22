import React from 'react';

interface Customer {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

interface Props {
  customers: Customer[];
  activeId: string;
  onSelect: (customer: Customer) => void;
}

export const AdminChatList: React.FC<Props> = ({ customers, activeId, onSelect }) => {
  return (
    <div className="admin-chat-list glass">
      <div className="chat-list-header">
        <h2>Tin nhắn</h2>
        <span className="badge">12</span>
      </div>
      
      <div className="chat-list-search">
        <input type="text" placeholder="Tìm kiếm khách hàng..." />
      </div>
      
      <div className="chat-list-items">
        {customers.map(c => (
          <div 
            key={c.id} 
            className={`chat-list-item ${activeId === c.id ? 'active' : ''}`}
            onClick={() => onSelect(c)}
          >
            <div className="avatar-wrapper">
              <img src={c.avatar} alt={c.name} />
              {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
            </div>
            <div className="item-info">
              <div className="item-header">
                <h4>{c.name}</h4>
                <span className="time">{c.time}</span>
              </div>
              <p className="last-message">{c.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
