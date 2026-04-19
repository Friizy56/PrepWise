import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (user === undefined) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg">Checking authentication...</p>
        </div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}