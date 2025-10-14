import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import Home from './Routes/Home';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import AdminPanel from "./Routes/AdminPanel";
import Dashboard from "./Routes/Dashboard";


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          <Route path="/no-autorizado" element={<div>No autorizado</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
