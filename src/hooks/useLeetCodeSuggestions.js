import { useMemo } from "react";
import { generateLeetCodeSuggestions } from "../utils/scheduler";

export default function useLeetCodeSuggestions(stats, tasks) {
    return useMemo(() => generateLeetCodeSuggestions(stats, tasks), [stats, tasks]);
}
