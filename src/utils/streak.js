export function calculateStreak(tasks = []) {
    const days = new Set(
        tasks.map((task) => {
            const date = task.createdAt?.seconds
                ? new Date(task.createdAt.seconds * 1000)
                : new Date(task.createdAt);
            return date.toDateString();
        })
    );

    let streak = 0;
    const current = new Date();

    while (days.has(current.toDateString())) {
        streak++;
        current.setDate(current.getDate() - 1);
    }

    return streak;
}
