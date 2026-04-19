import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export const addTask = async (task) => {
    return await addDoc(tasksCollection, task);
};

export const getTasksByUser = async (userId) => {
    const snapshot = await getDocs(tasksCollection);
    return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((task) => task.userId === userId);
};

export const deleteTask = async (id) => {
    return await deleteDoc(doc(db, "tasks", id));
};

export const updateTask = async (id, data) => {
    return await updateDoc(doc(db, "tasks", id), data);
};