import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) return setError("Please enter your credentials.");
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-4">
                        <LogoIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight font-heading">PrepWise</h1>
                    <p className="text-slate-500 mt-2">Elevate your technical preparation</p>
                </div>

                <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-center text-white">Welcome back</CardTitle>
                        <p className="text-center text-xs text-slate-500 mt-1">Please enter your details to sign in</p>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs font-medium text-center">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Email Address</label>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300">Forgot?</a>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                        </div>

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : "Sign In"}
                        </Button>

                        <div className="pt-4 text-center">
                            <p className="text-sm text-slate-500">
                                Don’t have an account?{" "}
                                <Link to="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-slate-600 mt-8">
                    &copy; 2024 PrepWise. All rights reserved.
                </p>
            </div>
        </div>
    );
}

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
);