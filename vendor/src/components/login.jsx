import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/Login-page.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const valid_email = "admin@email.com";
  const valid_password = "Admin@123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === valid_email && password === valid_password) {
      setError("");
      navigate("/vendor");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 px-6">
        <div className="min-h-screen flex flex-col">
          <div className="pt-10 md:pt-16">
            <button className="px-6 py-2 bg-[#F5AA33] text-white rounded-full">
              Logo
            </button>
          </div>

          <div className="flex-1 flex items-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-3xl font-semibold mb-2">Welcome!</h1>
              <p className="text-sm mb-6 text-gray-500">
                Welcome admin! Please enter your details
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button className="w-full bg-blue-500 text-white py-2 rounded">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img src={Image} className="h-screen w-full object-cover" />
      </div>
    </div>
  );
}
