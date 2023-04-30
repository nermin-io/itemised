import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import TodoItem from "./TodoItem";
import { groupItemsByDate } from "@/helpers";
import CardRowGroup from "@/components/CardRowGroup";

interface Props {}

const TodoList: React.FC<Props> = () => {
  const { todos } = useTodos();
  const outstandingTodos = todos.filter((t) => !t.completed);

  const groups = groupItemsByDate(outstandingTodos);

  return (
    <>
      <CardHeader>
        <p>My List</p>
        <NewTaskModal />
      </CardHeader>
      <CardBody>
        {Object.keys(groups).map((date) => (
          <CardRowGroup key={date}>
            <p>{date}</p>
            {groups[date].map((item) => (
              <TodoItem key={item.key} item={item} />
            ))}
          </CardRowGroup>
        ))}
      </CardBody>
    </>
  );
};

export default TodoList;
