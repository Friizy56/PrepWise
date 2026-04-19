export const getTopicDistribution = (tasks = []) => {
    const map = {};
    tasks.forEach((task) => {
        const topic = task.topic || "Misc";
        map[topic] = (map[topic] || 0) + 1;
    });
    return map;
};

export const getDifficultyDistribution = (tasks = []) => {
    return tasks.reduce(
        (counts, task) => {
            const difficulty = task.difficulty || "Easy";
            counts[difficulty] = (counts[difficulty] || 0) + 1;
            return counts;
        },
        { Easy: 0, Medium: 0, Hard: 0 }
    );
};

export const getMostPracticedTopic = (tasks = []) => {
    const topics = getTopicDistribution(tasks);
    const sorted = Object.entries(topics).sort(([, a], [, b]) => b - a);
    return sorted[0]?.[0] || "None";
};

export const getHardTaskCount = (tasks = []) => {
    return tasks.filter((task) => task.difficulty === "Hard").length;
};

export const getTotalTasks = (tasks = []) => tasks.length;
