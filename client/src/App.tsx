import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import WorkflowPage from "./pages/WorkflowPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;