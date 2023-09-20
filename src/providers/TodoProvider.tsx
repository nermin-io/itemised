import React, { useState, useEffect } from "react";
import TodoContext, { TodoItem } from "@/context/todo";
import { formatISO, isValid } from "date-fns";
import { arrayMove } from "@dnd-kit/sortable";
import { isBoolean } from "lodash";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const deserializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key)) {
    return new Date(value);
  }

  return value;
};

export const serializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key) && value instanceof Date) {
    return formatISO(value);
  }

  return value;
};

const getInitialState = () => {
  if (typeof window === "undefined") return [];

  const todos = localStorage.getItem("todos");
  try {
    const parsedTodos = todos
      ? (JSON.parse(todos, deserializer) as Array<TodoItem>)
      : [];
    const isValidObject = parsedTodos.every(
      (todo) =>
        todo.key &&
        todo.title &&
        todo.description &&
        isBoolean(todo.completed) &&
        isValid(todo.date)
    );
    return isValidObject ? parsedTodos : [];
  } catch (e) {
    return [];
  }
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(getInitialState);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos, serializer));
  }, [todos]);

  const clear = () => {
    localStorage.setItem("todos", JSON.stringify([], serializer));
  };

  const addItem = (todo: TodoItem) => {
    setTodos((curr) => [...curr, todo]);
  };

  const removeItem = (key: string) => {
    const filteredTodos = todos.filter((t) => t.key !== key);
    setTodos(filteredTodos);
  };

  const reorderItems = (active: string, over: string) => {
    setTodos((items) => {
      const keys = items.map((t) => t.key);
      const startIdx = keys.indexOf(active);
      const endIdx = keys.indexOf(over);

      return arrayMove(items, startIdx, endIdx);
    });
  };

  const updateItem = (key: string, newItem: Omit<TodoItem, "key">) => {
    const newTodos = todos.map((todo) => {
      if (todo.key === key) {
        return {
          key: key,
          ...newItem,
        };
      }

      return todo;
    }) as TodoItem[];

    setTodos(newTodos);
  };

  const rescheduleMany = (keys: Array<string>, date: Date) => {
    const newTodos = todos.map((todo) => {
      if (keys.includes(todo.key)) {
        return {
          ...todo,
          date: date,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const context = {
    todos,
    setTodos,
    clear,
    addItem,
    removeItem,
    updateItem,
    rescheduleMany,
    reorderItems,
  };

  return (
    <TodoContext.Provider value={context}>
      {shouldRender && children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
