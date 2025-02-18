import { database } from "../";
import Todo from '../models/todo';
import { Todo as TodoType } from "core/types/todo";

class TodoService {
    private TodoDB;

    constructor() {
        this.TodoDB = database.collections.get<Todo>("todos");
    }

    // Method to get all todos
    public async getAll() {
        return await this.TodoDB.query().fetch();
    }

    // Method to add a new todo
    public async add(todo: TodoType): Promise<boolean> {
        try {
            await database.write(async () => {
                await this.TodoDB.create((newTodo) => {
                    newTodo.title = todo.title;
                    newTodo.priority = todo.priority;
                    newTodo.completed = todo.completed;
                    newTodo.description = todo.description;
                });
            });

            return true;
        } catch (error) {
            console.error("Error adding todo:", error);
            return false;
        }
    }

    // Method to update a todo
    public async update(todo: TodoType): Promise<boolean> {
        try {
            await database.write(async () => {
                const todoToUpdate = await this.TodoDB.find(todo.id);
                if (todoToUpdate) {
                    await todoToUpdate.update((record) => {
                        record.title = todo.title;
                        record.priority = todo.priority;
                        record.completed = todo.completed;
                        record.description = todo.description;
                    });
                }
            });
            return true;
        } catch (error) {
            console.error("Error updating todo:", error);
            return false;
        }
    }

    // Method to update just the completed status of a todo
    public async updateCompletedStatus(todo: TodoType): Promise<boolean> {
        try {
            await database.write(async () => {
                const todoToUpdate = await this.TodoDB.find(todo.id);
                await todoToUpdate.update((record) => {
                    record.completed = !todo.completed;
                });
            });

            return true;
        } catch (error) {
            console.error("Error updating todo:", error);
            return false;
        }
    }

    // Method to delete a todo
    public async delete(todo: TodoType): Promise<boolean> {
        try {
            await database.write(async () => {
                const todoToDelete = await this.TodoDB.find(todo.id);
                await todoToDelete.destroyPermanently();
            });

            return true;
        } catch (error) {
            console.error("Error deleting todo:", error);
            return false;
        }
    }
}

export default TodoService;