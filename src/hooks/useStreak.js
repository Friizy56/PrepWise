import { useMemo } from "react";
import { calculateStreak } from "../utils/streak";

export default function useStreak(tasks) {
    return useMemo(() => calculateStreak(tasks), [tasks]);
}
