import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setToken);

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validatePassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    return strongPasswordRegex.test(password);
  };

  const handleRegister = async () => {
    try {
  
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }
  
      if (!validatePassword(password)) {
        alert(
          "Password must contain:\n• 8+ characters\n• One uppercase letter\n• One digit\n• One special character"
        );
        return;
      }
  
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
  
      alert("Registration successful! Please login.");
  
      setIsRegister(false);
  
      setPassword("");
  
    } catch (error: any) {
  
      if (
        error.response?.data?.message?.includes("already")
      ) {
        alert("User already registered. Please login.");
      } else {
        alert("Registration failed");
      }
  
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
  
      const response = await api.post("/auth/login", {
        email,
        password,
      });
  
      setToken(response.data.token);
  
      navigate("/dashboard");
  
    } catch (error) {
  
      alert("Invalid email or password");
  
      console.error(error);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
  
    if (e.key === "Enter") {
  
      if (isRegister) {
        handleRegister();
      } else {
        handleLogin();
      }
  
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          AI Workflow Studio
        </h1>

        <p className="text-gray-400 mb-8">
          Build AI workflows visually
        </p>

        {isRegister && (
          <input
            className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white outline-none border border-slate-700 focus:border-violet-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        <input
          className="w-full p-3 rounded-lg mb-4 bg-slate-800 text-white outline-none border border-slate-700 focus:border-violet-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          className="w-full p-3 rounded-lg mb-2 bg-slate-800 text-white outline-none border border-slate-700 focus:border-violet-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            Forgot Password?
          </button>
        </div>

        <button
          className="w-full bg-violet-600 hover:bg-violet-700 transition-all duration-200 p-3 rounded-lg font-semibold text-white"
          onClick={isRegister ? handleRegister : handleLogin}
        >
          {isRegister ? "Create Account" : "Login"}
        </button>

        <div className="mt-6 text-center text-gray-400">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-violet-400 hover:text-violet-300 font-medium"
          >
            {isRegister ? "Login" : "Register"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;