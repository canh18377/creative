
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerChat from './pages/CustomerChat';
import { AdminLayout } from './pages/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerChat />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
