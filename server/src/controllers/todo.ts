import { Request, Response } from "express";
import { Todo } from "../models/todo";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createNewTodo = async(req : AuthRequest, res : Response)=> {
    const {title} = req.body;
    const userId = req.user?._id;
    try {
        const newTodo =await Todo.create({
            title,
            userId
        })
        res.status(201).json({message : "New todo added.", todo : newTodo})
    } catch (error) {
       console.log(error);
       res.status(500).json({message : "Something went wrong !!"})
        
    }
}

export const getTodos = async(req : Request, res : Response)=> {
    const todos = await Todo.find();
    try {
        res.status(200).json({message : "all todo fetched.", todos : todos})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !!"})
    }
}

export const getTodo = async(req : Request, res : Response)=> {
    const {todoId} = req.params;
    try {
        const todo = await Todo.findById(todoId);
        res.status(200).json({message : "todo has been fetched.", todo : todo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !!"})
    }
}

export const updateTodo = async(req : Request, res : Response)=> {
    const {todoId} = req.params;
    const {title} = req.body;
    try {
        const updateTodo = await Todo.findByIdAndUpdate(todoId, {title}, {new : true});
        res.status(200).json({message : "Todo has been updated.", todo : updateTodo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !!"})
        
    }
}

export const deleteTodo = async(req : Request, res : Response)=> {
    const {todoId} = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(todoId);
        res.status(200).json({message : "Todo has been deleted."})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !!"})
    }
}


