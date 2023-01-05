import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username.length) {
      alert("Username is required!");
      return;
    }
    if (!password.length) {
      alert("Password is required!");
      return;
    }

    try {
      const res = await login({ username, password });
      localStorage.setItem("access_token", res.access_token);
      setTimeout(() => {
        navigate("/jobs");
      }, 1250);
    } catch (error) {
      alert("Invalid username/password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-base-200 h-full flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="card-title">Login</h1>
          <hr />
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type Username"
              className="input input-bordered w-full max-w-xs"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type Password"
              className="input input-bordered w-full max-w-xs"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3 card-actions justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
