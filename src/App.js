import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DeliveryHeader from "./pages/Header";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <DeliveryHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
