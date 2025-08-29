import mongoose, { Schema } from "mongoose";
import { User } from "./user";

const todoSchema = new Schema({
    title : {
        type: String,
        require: true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    }
});

export const Todo = mongoose.model("Todo", todoSchema);