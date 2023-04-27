import { useContext } from "react";
import TodoContext from "@/context/todo";

const useTodos = () => {
  const context = useContext(TodoContext);
  const hasContextProperties = Object.keys(context).length > 0;

  if (context === undefined || !hasContextProperties)
    throw new Error("Cannot use useTodos() outside of TodoProvider");

  return context;
};

export default useTodos;
