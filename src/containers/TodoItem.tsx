import CardRow from "@/components/CardRow";
import Checkbox from "@/components/Checkbox";
import { TodoItem } from "@/context/todo";
import useTodos from "@/hooks/todo";
import React from "react";

interface Props {
  item: TodoItem;
}

const TodoItem: React.FC<Props> = ({ item }) => {
  const { completeItem } = useTodos();

  const handleCompleteItem = () => {
    completeItem(item.key);
  };

  return (
    <CardRow>
      <Checkbox checked={item.completed} onCheckedChange={handleCompleteItem} />
      <div>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>
    </CardRow>
  );
};

export default TodoItem;
