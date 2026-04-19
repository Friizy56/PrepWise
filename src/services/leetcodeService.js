import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";

const leetcodeStatsCollection = collection(db, "leetcodeStats");

export const saveLeetCodeStats = async (userId, stats) => {
    const data = {
        userId,
        ...stats,
        timestamp: new Date(),
    };
    return await addDoc(leetcodeStatsCollection, data);
};

export const getLeetCodeStatsHistory = async (userId) => {
    const q = query(
        leetcodeStatsCollection,
        where("userId", "==", userId),
        orderBy("timestamp", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};