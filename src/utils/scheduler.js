export const generateStudyPlan = (tasks = []) => {
    if (tasks.length === 0) {
        return [
            "Start with 2 easy array problems to build momentum.",
            "Spend 15 minutes reviewing common DSA patterns (two pointers, binary search).",
            "Try one medium problem from an easy topic to build confidence.",
            "End with a short recap of what you learned today.",
        ];
    }

    const topicStats = tasks.reduce((map, task) => {
        const topic = task.topic || "Misc";
        const difficulty = task.difficulty || "Easy";

        map[topic] = map[topic] || { total: 0, easy: 0, medium: 0, hard: 0 };
        map[topic].total += 1;
        map[topic][difficulty.toLowerCase()] += 1;
        return map;
    }, {});

    const sortedTopics = Object.entries(topicStats).sort(
        ([, a], [, b]) => a.total - b.total
    );

    const weakTopic = sortedTopics[0]?.[0] || "General DSA";
    const strongTopic = sortedTopics[sortedTopics.length - 1]?.[0] || "General DSA";

    const difficultyCounts = tasks.reduce(
        (counts, task) => {
            const diff = (task.difficulty || "Easy").toLowerCase();
            counts[diff] = (counts[diff] || 0) + 1;
            return counts;
        },
        { easy: 0, medium: 0, hard: 0 }
    );

    const totalSolved = difficultyCounts.easy + difficultyCounts.medium + difficultyCounts.hard;
    const targetDifficulty =
        totalSolved === 0
            ? "Easy"
            : difficultyCounts.hard / totalSolved > 0.35
                ? "Medium"
                : difficultyCounts.medium / totalSolved > 0.4
                    ? "Medium"
                    : "Easy";

    const plan = [
        `Solve 2 ${targetDifficulty} problems from ${weakTopic}.`,
        `Review one recent mistake from your ${weakTopic} problems.`,
        `Practice 1 ${targetDifficulty === "Hard" ? "Medium" : targetDifficulty} problem in ${strongTopic} to keep your strengths sharp.`,
        "Spend 20 minutes on concept revision or a DSA cheat sheet.",
    ];

    if (sortedTopics.length > 1) {
        plan.splice(2, 0, `Then solve a practice problem from ${sortedTopics[1][0]} to keep your routine balanced.`);
    }

    return plan;
};

const leetCodeTopicLink = (topic) => {
    const slug = topic
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    return `https://leetcode.com/tag/${slug}/`;
};

export const generateLeetCodeSuggestions = (stats = {}, tasks = []) => {
    const { easySolved = 0, mediumSolved = 0, hardSolved = 0 } = stats || {};
    const easy = easySolved;
    const medium = mediumSolved;
    const hard = hardSolved;
    const total = easy + medium + hard;

    const topicStats = (tasks || []).reduce((map, task) => {
        const topic = task.topic || "Misc";
        map[topic] = (map[topic] || 0) + 1;
        return map;
    }, {});

    const sortedTopics = Object.entries(topicStats).sort(([, a], [, b]) => a - b);
    const weakTopic = sortedTopics[0]?.[0] || "array and string";
    const weakTopicLink = leetCodeTopicLink(weakTopic);

    if (total === 0) {
        return [
            { text: "Start with 2 easy problems to build consistency." },
            {
                text: `Focus on ${weakTopic} fundamentals first if you have a weak topic in your task history.`,
                link: weakTopicLink,
            },
            { text: "Track your solved counts and aim to gradually add medium problems." },
        ];
    }

    const easyRatio = easy / total;
    const mediumRatio = medium / total;
    const hardRatio = hard / total;

    const suggestions = [];
    if (hardRatio < 0.2) {
        suggestions.push({
            text: `Solve 1 Hard problem in ${weakTopic} to improve your toughest area.`,
            link: weakTopicLink,
        });
        suggestions.push({ text: "Then solve 1 Medium problem for practice pacing." });
    } else if (mediumRatio < 0.3) {
        suggestions.push({
            text: `Solve 2 Medium problems in ${weakTopic} to strengthen your problem-solving rhythm.`,
            link: weakTopicLink,
        });
        suggestions.push({ text: "Review one hard problem approach from the last 3 days." });
    } else if (easyRatio < 0.4) {
        suggestions.push({
            text: `Solve 2 Easy problems in ${weakTopic} to keep consistency and build confidence.`,
            link: weakTopicLink,
        });
        suggestions.push({ text: "Spend 15 minutes reviewing foundational patterns." });
    } else {
        suggestions.push({ text: `Solve 1 Medium and 1 Hard problem to keep improving your difficulty mix.` });
        suggestions.push({
            text: `Use ${weakTopic} as your target topic if it is still a weak area.`,
            link: weakTopicLink,
        });
    }

    suggestions.push({ text: "Log each problem after solving it so you can measure progress over time." });

    return suggestions;
};
