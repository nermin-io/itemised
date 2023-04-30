import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import TodoItem from "./TodoItem";
import { getDueDays, groupItemsByDate, triage } from "@/helpers";
import CardRowGroup from "@/components/CardRowGroup";
import { parse } from "date-fns";

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
        {Object.keys(groups).map((dateStr) => {
          const date = parse(dateStr, "LLL d", new Date());
          const urgency = triage(date);
          const dueDays = getDueDays(date);
          return (
            <CardRowGroup key={dateStr} urgency={urgency}>
              <p>
                {dateStr} ({dueDays})
              </p>
              {groups[dateStr].map((item) => (
                <TodoItem key={item.key} item={item} />
              ))}
            </CardRowGroup>
          );
        })}
      </CardBody>
    </>
  );
};

export default TodoList;
