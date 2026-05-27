import { useState } from "react";

import api from "../api/axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await api.post("/auth/forgot-password", {
      email,
    });

    alert("Password reset link sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your email address
        </p>

        <input
          className="w-full p-3 rounded-lg mb-6 bg-slate-800 text-white border border-slate-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-violet-600 hover:bg-violet-700 p-3 rounded-lg font-semibold"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;