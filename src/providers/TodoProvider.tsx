import React, { useState, useEffect } from "react";
import TodoContext, { TodoItem } from "@/context/todo";
import { formatISO } from "date-fns";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const deserializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key)) {
    return new Date(value);
  }

  return value;
};

const serializer = (key: string, value: any) => {
  const dateKeys = ["date"];
  if (dateKeys.includes(key) && value instanceof Date) {
    return formatISO(value);
  }

  return value;
};

const getInitialState = () => {
  if (typeof window === "undefined") return [];

  const todos = localStorage.getItem("todos");
  return todos ? (JSON.parse(todos, deserializer) as Array<TodoItem>) : [];
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

  const updateItem = (key: string, item: TodoItem) => {
    const newTodos = todos.map((t) => {
      if (t.key === key) {
        return item;
      }

      return item;
    });

    setTodos(newTodos);
  };

  const context = {
    todos,
    clear,
    addItem,
    removeItem,
    updateItem,
  };

  return (
    <TodoContext.Provider value={context}>
      {shouldRender && children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;