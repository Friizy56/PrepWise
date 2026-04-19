import { useMemo } from "react";
import { generateStudyPlan } from "../utils/scheduler";

export default function useStudyPlan(tasks) {
    return useMemo(() => generateStudyPlan(tasks), [tasks]);
}
