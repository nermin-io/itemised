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
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  clear: () => void;
  addItem: (item: TodoItem) => void;
  updateItem: (key: string, item: Omit<TodoItem, "key">) => void;
  removeItem: (key: string) => void;
  rescheduleMany: (keys: Array<string>, date: Date) => void;
  reorderItems: (active: string, order: string) => void;
}

const defaultContextVal: TodoContext = {
  todos: [],
  setTodos: () => {},
  clear: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  rescheduleMany: () => {},
  reorderItems: () => {},
};

const TodoContext = React.createContext<TodoContext>(defaultContextVal);

export default TodoContext;
