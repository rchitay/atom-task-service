import {Router} from "express";
import {Task} from "../interfaces/Task";

import admin = require(
    "../config/initializeApp.config"
);

const db = admin.initialize().firestore();

const router = Router();
const collectionTask = "Tasks";

// list
router.get("/tasks", async (req, res) => {
    try {
        // const idUser = req.params.idUser;
        const snapshot = await db.collection(collectionTask)
        .orderBy("creationDate", "desc")
        .get();
        // .where("userId", "==", idUser).get();
        if (snapshot.empty) {
            res.status(200).json( [] );
        }
        const tasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: "Error get tasks", error});
    }
});

// create task
router.post("/tasks", async (req, res) => {
    try {
        const newTask: Task = req.body;
        const docRef = await db.collection(collectionTask).add(newTask);
        res.status(200).json({id: docRef.id});
    } catch (error) {
        res.status(500).json({message: "Error: ", error});
    }
});

// retrieve Task
router.get("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await db.collection(collectionTask).doc(taskId).get();
        if (!task.exists) {
            res.status(200).json({message: "Task not found"});
        }
        const taskData = task.data();
        /* if (taskData?.userId !== idUser) {
            res.status(403).json({message: "Task not found"});
        } */
        res.status(200).json({id: task.id, ...taskData});
    } catch (error) {
        res.status(500).json({message: "Error ", error});
    }
});

// update task
router.put("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedTask: Partial<Task> = req.body;
        const task = await db.collection(collectionTask).doc(taskId).get();
        if (!task.exists) {
            res.status(200).json({message: "Task not found"});
        }
        const taskRef = db.collection(collectionTask).doc(taskId);
        await taskRef.update(updatedTask);
        res.status(200).json({message: "Updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Error", error});
    }
});

// delete task
router.delete("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await db.collection(collectionTask).doc(taskId).get();
        if (!task.exists) {
            res.status(200).json({message: "Task not found"});
        }
        await db.collection(collectionTask).doc(taskId).delete();
        res.status(200).json({message: "Deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error", error});
    }
});

export default router;
