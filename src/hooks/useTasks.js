import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getTasksByUser } from "../services/taskService";

export default function useTasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            setTasks([]);
            setLoading(false);
            return;
        }

        let active = true;
        setLoading(true);

        getTasksByUser(user.uid)
            .then((data) => {
                if (active) setTasks(data);
            })
            .catch((error) => {
                console.error("Failed to fetch tasks:", error);
                if (active) setTasks([]);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [user]);

    return { tasks, loading };
}
