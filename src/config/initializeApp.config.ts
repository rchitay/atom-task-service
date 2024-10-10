import * as admin from "firebase-admin";

import serviceAccount from "./atom-task-list-firebase-adminsdk.json";

/**
* initialize App.
* @return {firebase-admin} Connection Config
*/
export function initialize() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount
            ),
            databaseURL: "https://atom-task-list-default-rtdb.firebaseio.com",
        });
    }
    return admin;
}
