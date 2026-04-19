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

export const getWeakTopic = (tasks = []) => {
    if (tasks.length === 0) return "None";

    // Get topic distribution
    const topicCount = getTopicDistribution(tasks);

    // Calculate recency score (days since last practice)
    const now = new Date();
    const topicLastPractice = {};

    tasks.forEach((task) => {
        const topic = task.topic || "Misc";
        const taskDate = task.createdAt?.seconds
            ? new Date(task.createdAt.seconds * 1000)
            : new Date(task.createdAt);

        if (!topicLastPractice[topic] || taskDate > topicLastPractice[topic]) {
            topicLastPractice[topic] = taskDate;
        }
    });

    // Calculate difficulty avoidance score
    const topicDifficulty = {};
    tasks.forEach((task) => {
        const topic = task.topic || "Misc";
        const difficulty = task.difficulty || "Easy";
        if (!topicDifficulty[topic]) {
            topicDifficulty[topic] = { Easy: 0, Medium: 0, Hard: 0 };
        }
        topicDifficulty[topic][difficulty]++;
    });

    // Calculate weakness score for each topic
    const topicScores = Object.keys(topicCount).map((topic) => {
        const count = topicCount[topic];
        const lastPractice = topicLastPractice[topic];
        const daysSinceLast = lastPractice ? Math.floor((now - lastPractice) / (1000 * 60 * 60 * 24)) : 30; // Default 30 days if no data

        const diff = topicDifficulty[topic] || { Easy: 0, Medium: 0, Hard: 0 };
        const hardRatio = diff.Hard / Math.max(count, 1); // Ratio of hard problems
        const difficultyScore = 1 - hardRatio; // Lower score if avoiding hard problems

        // Combined score: prioritize topics with low practice count, old last practice, and low hard problem ratio
        const weaknessScore = (1 / Math.max(count, 0.1)) * (daysSinceLast / 7) * difficultyScore;

        return { topic, score: weaknessScore, count, daysSinceLast, hardRatio };
    });

    // Sort by weakness score (highest = weakest)
    topicScores.sort((a, b) => b.score - a.score);

    return topicScores[0]?.topic || "None";
};

export const getHardTaskCount = (tasks = []) => {
    return tasks.filter((task) => task.difficulty === "Hard").length;
};

export const getTotalTasks = (tasks = []) => tasks.length;
