import React, { useState, useEffect } from "react";
import { Menu, X, Home, Settings, LogOut, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function DeliveryHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deliveryName, setDeliveryName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("delivery_token");
    if (token) {
      const delivery = JSON.parse(localStorage.getItem("delivery_user") || "{}");
      if (delivery.Name) setDeliveryName(delivery.Name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("delivery_token");
    localStorage.removeItem("delivery_user");
    window.location.href = "/login";
  };

  const NavLink = ({ to, icon: Icon, label, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <Truck className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-wide">Delivery Portal</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {deliveryName && (
            <span className="text-sm">Welcome, <strong>{deliveryName}</strong></span>
          )}
          <NavLink to="/" icon={Home} label="Home" />
          <NavLink to="/settings" icon={Settings} label="Settings" />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700/90 backdrop-blur-lg px-6 pb-4 space-y-2">
          {deliveryName && (
            <span className="block text-sm">Welcome, <strong>{deliveryName}</strong></span>
          )}
          <NavLink to="/" icon={Home} label="Home" onClick={() => setMobileMenuOpen(false)} />
          <NavLink to="/orders" icon={Settings} label="Orders" onClick={() => setMobileMenuOpen(false)} />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
}
