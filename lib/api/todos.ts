import axios from ".";
import { TodoType } from "../../types/todo";

// Call todo list
export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");