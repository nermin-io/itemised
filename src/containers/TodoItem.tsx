import Button from "@/components/Button";
import CardRow from "@/components/CardRow";
import Checkbox from "@/components/Checkbox";
import { TodoItem } from "@/context/todo";
import useTodos from "@/hooks/todo";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import TaskModal from "./TaskModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Sortable from "@/components/Sortable";

interface Props {
  item: TodoItem;
}

const TodoItem: React.FC<Props> = ({ item }) => {
  const { updateItem, removeItem } = useTodos();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: item.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <Sortable innerRef={setNodeRef} style={style} {...attributes}>
      <CardRow>
        <Checkbox
          checked={item.completed}
          onCheckedChange={handleCompleteItem}
        />
        <TaskModal item={item} />
      </CardRow>
      <Button
        size="small"
        intent="media"
        innerRef={setActivatorNodeRef}
        {...listeners}
      >
        <DragHandleDots2Icon color="#AAA" />
      </Button>
    </Sortable>
  );
};

export default TodoItem;
