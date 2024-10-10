import {Router} from "express";
import {User} from "../interfaces/User";

import admin = require(
    "../config/initializeApp.config"
);

const db = admin.initialize().firestore();

// eslint-disable-next-line new-cap
const router = Router();
const collectionUser = "Users";

// Retrieve user by email or create a new user if it doesn't exist
router.get("/users/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const userQuerySnapshot = await db.collection(collectionUser)
            .where("email", "==", email)
            .get();

        if (userQuerySnapshot.empty) {
            res.status(200).json({message: "Not Exists"});
        } else {
            const user = userQuerySnapshot.docs[0];
            res.status(200).json({message: "Exists", id: user.id});
        }
    } catch (error) {
        res.status(500).json({message: "Error retrieving user", error});
    }
});

// create user
router.post("/users", async (req, res) => {
    try {
        const newUser: User = req.body;
        const docRef = await db.collection(collectionUser).add(newUser);
        res.status(200).json({id: docRef.id});
    } catch (error) {
        res.status(500).json({message: "Error: ", error});
    }
});

export default router;
