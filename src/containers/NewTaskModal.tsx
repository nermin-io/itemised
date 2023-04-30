import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button, { TriggerButton } from "@/components/Button";
import DialogFooter from "@/components/DialogFooter";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import styles from "./NewTaskModal.module.scss";

interface Props {}

const NewTaskModal: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onCancelHandler = () => {
    setTitle("");
    setDescription("");
  };

  const onSaveHandler = () => {
    console.log("Saved");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <TriggerButton>Add Task</TriggerButton>
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
              <TriggerButton size="small" onClick={onSaveHandler}>
                Add Task
              </TriggerButton>
            </Dialog.Close>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewTaskModal;
