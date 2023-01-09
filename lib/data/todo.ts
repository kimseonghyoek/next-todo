import { readFileSync } from "fs"
import { TodoType } from "../../types/todo";

const getList = () => {
  const todoBuffer = readFileSync("data/todos.json");
  const todoString = todoBuffer.toString();
  if (!todoString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todoString);
  return todos;
}

export default { getList };