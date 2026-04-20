import useTasks from "../hooks/useTasks";
import useStudyPlan from "../hooks/useStudyPlan";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export default function Planner() {
    const { tasks } = useTasks();
    const plan = useStudyPlan(tasks);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Study Planner</h1>
                <p className="text-slate-400">Your personalized roadmap for technical mastery.</p>
            </div>

            <Card className="overflow-hidden border-indigo-500/20 shadow-[0_0_40px_rgba(79,70,229,0.05)]">
                <CardHeader className="bg-indigo-600/5 px-8 py-6">
                    <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <PlanIcon />
                        </div>
                        Today's Personalized Strategy
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    {plan.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                                <LoadingIcon />
                            </div>
                            <p className="font-medium">Crafting your plan...</p>
                            <p className="text-sm">Analyzing your recent practice data.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {plan.map((item, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                                            {i + 1}
                                        </div>
                                        {i !== plan.length - 1 && <div className="w-[1px] h-full bg-gradient-to-b from-slate-800 to-transparent my-2" />}
                                    </div>
                                    <div className="pb-8">
                                        <p className="text-slate-100 group-hover:translate-x-1 transition-transform duration-200 leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-start gap-3">
                        <span className="text-indigo-400 mt-1"><InfoIcon /></span>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            This plan is dynamically generated using our proprietary algorithm that considers your recent DSA progress, weak topics, and practice frequency. Follow this sequence for optimal results.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const PlanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 4.6a10 10 0 1 1-12.8 0"/></svg>
);

const LoadingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-slate-700"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
);