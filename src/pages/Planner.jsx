import useTasks from "../hooks/useTasks";
import useStudyPlan from "../hooks/useStudyPlan";

export default function Planner() {
    const { tasks } = useTasks();
    const plan = useStudyPlan(tasks);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Study Planner</h1>

            <div className="bg-white p-4 rounded shadow">
                {plan.length === 0 ? (
                    <p className="text-gray-500">Loading your personalized plan...</p>
                ) : (
                    <ul className="space-y-3">
                        {plan.map((item, i) => (
                            <li key={i} className="text-gray-700">
                                • {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-6 text-sm text-gray-500">
                This plan is generated from your recent DSA progress and weak topics.
            </div>
        </div>
    );
}