"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createNewTodo = void 0;
const todo_1 = require("../models/todo");
const createNewTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTodo = yield todo_1.Todo.create({
            title,
        });
        res.status(201).json({ message: "New todo added.", todo: newTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" });
    }
});
exports.createNewTodo = createNewTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_1.Todo.find();
    try {
        res.status(200).json({ message: "all todo fetched.", todos: todos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" });
    }
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const todo = yield todo_1.Todo.findById(todoId);
        res.status(200).json({ message: "todo has been fetched.", todo: todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" });
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const { title } = req.body;
    try {
        const updateTodo = yield todo_1.Todo.findByIdAndUpdate(todoId, { title }, { new: true });
        res.status(200).json({ message: "Todo has been updated.", todo: updateTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const todo = yield todo_1.Todo.findByIdAndDelete(todoId);
        res.status(200).json({ message: "Todo has been deleted." });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong !!" });
    }
});
exports.deleteTodo = deleteTodo;
