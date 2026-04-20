import React from "react";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",
    secondary: "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700",
    outline: "bg-transparent text-slate-100 border border-slate-700 hover:bg-slate-800",
    ghost: "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/50",
    danger: "bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
