import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        if (!email || !password) return setError("Please fill in all fields.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        
        setError("");
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-4">
                        <LogoIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight font-heading">PrepWise</h1>
                    <p className="text-slate-500 mt-2">Join thousands of successful candidates</p>
                </div>

                <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-center text-white">Create your account</CardTitle>
                        <p className="text-center text-xs text-slate-500 mt-1">Start your journey to mastery today</p>
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
                                onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                            />
                            <p className="text-[10px] text-slate-500 px-1 mt-1">Must be at least 6 characters long.</p>
                        </div>

                        <Button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full mt-2"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>

                        <div className="pt-4 text-center">
                            <p className="text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-slate-600 mt-8">
                    By signing up, you agree to our Terms of Service.
                </p>
            </div>
        </div>
    );
}

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
);