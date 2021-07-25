import database from "../index.js";
import {join, resolve} from "path";
import dotenv from "dotenv";

dotenv.config({
    path: join(resolve(), "./src/config/.env"),
});

const projectSchema = new database.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: database.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [{
        type: database.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Project = database.model("Project", projectSchema);

export default Project;
