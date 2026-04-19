import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // ✅ redirect after login
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to PrepWise
                </h2>

                <input
                    className="border p-2 mb-3 w-full rounded"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 mb-4 w-full rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
                >
                    Login
                </button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                        Signup
                    </Link>
                </p>

            </div>

        </div>
    );
}