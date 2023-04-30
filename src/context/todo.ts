import React from "react";

export interface TodoItem {
  key: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export interface TodoContext {
  todos: Array<TodoItem>;
  clear: () => void;
  addItem: (item: TodoItem) => void;
  updateItem: (key: string, item: TodoItem) => void;
  completeItem: (key: string) => void;
  removeItem: (key: string) => void;
}

const INITIAL_CONTEXT: TodoContext = {
  todos: [],
  clear: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  completeItem: () => {},
};

const TodoContext = React.createContext<TodoContext>(INITIAL_CONTEXT);

export default TodoContext;
