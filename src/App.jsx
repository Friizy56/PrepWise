import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="tracker" element={<Tracker />} />
                    <Route path="planner" element={<Planner />} />
                    <Route path="analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}