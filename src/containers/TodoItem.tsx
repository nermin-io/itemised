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
  const { updateItem, removeItem } = useTodos();

  const handleCompleteItem = () => {
    updateItem(item.key, {
      title: item.title,
      description: item.description,
      date: item.date,
      completed: !item.completed,
    });
  };

  const handleDeleteItem = () => {
    removeItem(item.key);
  };

  return (
    <CardRow>
      <Checkbox checked={item.completed} onCheckedChange={handleCompleteItem} />
      <TaskModal item={item} />
      <Button size="small" intent="media" onClick={handleDeleteItem}>
        <TrashIcon color="#AAA" />
      </Button>
    </CardRow>
  );
};

export default TodoItem;
