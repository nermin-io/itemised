import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import CardRow from "@/components/CardRow";
import Checkbox from "@/components/Checkbox";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";

interface Props {}

const TodoList: React.FC<Props> = () => {
  const { todos } = useTodos();
  console.log("todos", todos);

  return (
    <>
      <CardHeader>
        <p>My List</p>
        <NewTaskModal />
      </CardHeader>
      <CardBody>
        {todos.map((todo) => (
          <CardRow key={todo.key}>
            <Checkbox />
            <div>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
            </div>
          </CardRow>
        ))}
      </CardBody>
    </>
  );
};

export default TodoList;