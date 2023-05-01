import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TriggerButton } from "@/components/Button";
import DialogFooter from "@/components/DialogFooter";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import styles from "./TaskModal.module.scss";
import useTodos from "@/hooks/todo";
import { TodoItem } from "@/context/todo";
import { truncate } from "lodash";

interface Props {
  item: TodoItem;
}

const TaskModal: React.FC<Props> = ({ item }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [isDisabled, setIsDisabled] = useState(true);
  const { updateItem } = useTodos();

  useEffect(() => {
    if (title.length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [title]);

  const onSaveHandler = () => {
    updateItem(item.key, {
      title: title,
      description: description,
      completed: item.completed,
      date: item.date,
    });
  };

  const onCancelHandler = () => {
    setTitle(item.title);
    setDescription(item.description);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <a className={styles.Trigger} role="expandable">
          <p>{item.title}</p>
          <p>{truncate(item.description, { length: 50 })}</p>
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo Item"
            variant="text"
            intent="primary"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            size="small"
            variant="text"
          />
          <DialogFooter>
            <Dialog.Close asChild>
              <TriggerButton
                size="small"
                intent="secondary"
                onClick={onCancelHandler}
              >
                Cancel
              </TriggerButton>
            </Dialog.Close>
            <Dialog.Close asChild>
              <TriggerButton
                size="small"
                onClick={onSaveHandler}
                disabled={isDisabled}
              >
                Save
              </TriggerButton>
            </Dialog.Close>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TaskModal;
