import React from "react";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => (
  <div className={`p-6 border-b border-slate-800 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`font-heading text-lg font-semibold text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={`p-6 border-t border-slate-800 bg-slate-900/20 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
