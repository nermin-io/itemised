import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import CardRow from "@/components/CardRow";
import Checkbox from "@/components/Checkbox";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import TodoItem from "./TodoItem";

interface Props {}

const TodoList: React.FC<Props> = () => {
  const { todos } = useTodos();
  const outstandingTodos = todos.filter((t) => !t.completed);

  return (
    <>
      <CardHeader>
        <p>My List</p>
        <NewTaskModal />
      </CardHeader>
      <CardBody>
        {outstandingTodos.map((todo) => (
          <TodoItem key={todo.key} item={todo} />
        ))}
      </CardBody>
    </>
  );
};

export default TodoList;
