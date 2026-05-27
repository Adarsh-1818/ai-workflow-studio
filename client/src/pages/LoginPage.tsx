import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        name: "Adarsh",
        email,
        password,
      });
  
      alert("Registered! Now login.");
    } catch (err) {
      console.log(err);
      alert("Register failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
  
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
  
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">
          AI Workflow Studio
        </h1>

        <input
          className="w-full p-3 rounded mb-4 bg-slate-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

<input
          className="w-full p-3 rounded mb-4 bg-slate-800"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<button onClick={handleRegister}>
  Register
</button>

        <button
          className="w-full bg-violet-600 p-3 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;