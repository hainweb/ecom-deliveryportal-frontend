import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/api";
import { Truck } from "lucide-react"; // Icon for logo

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  // Redirect if already logged in
  const token = localStorage.getItem("delivery_token");
  if (token) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.Email || !formData.Password) {
        alert("Please enter both email and password.");
        return;
      }
      const res = await axios.post(`${BASE_URL}/login`, formData);
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("delivery_token", res.data.token);
        localStorage.setItem("delivery_user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        alert(res.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <Truck className="text-green-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Delivery Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="Email"
              name="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.Email}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="Password"
              name="Password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              value={formData.Password}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg text-white font-semibold transition"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
       {/*  <p className="mt-6 text-center text-sm text-gray-600">
          Not registered?{' '}
          <Link to="/signup" className="font-medium text-green-600 hover:underline">
            Create account
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
