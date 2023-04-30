import Button from "@/components/Button";
import CardRow from "@/components/CardRow";
import Checkbox from "@/components/Checkbox";
import { TodoItem } from "@/context/todo";
import useTodos from "@/hooks/todo";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import TaskModal from "./TaskModal";

interface Props {
  item: TodoItem;
}

const TodoItem: React.FC<Props> = ({ item }) => {
  const { completeItem, removeItem } = useTodos();

  const handleCompleteItem = () => {
    completeItem(item.key);
  };

  const handleDeleteItem = () => {
    removeItem(item.key);
  };

  return (
    <CardRow>
      <Checkbox checked={item.completed} onCheckedChange={handleCompleteItem} />
      <TaskModal item={item} />
      <Button size="small" intent="media" onClick={handleDeleteItem}>
        <TrashIcon />
      </Button>
    </CardRow>
  );
};

export default TodoItem;
