import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User created!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl mb-4 font-bold">Signup</h2>

            <input
                className="border p-2 mb-2 w-full"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2 mb-2 w-full"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                onClick={handleSignup}
            >
                Signup
            </button>
        </div>
    );
}