import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TriggerButton } from "@/components/Button";
import DialogFooter from "@/components/DialogFooter";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import styles from "./NewTaskModal.module.scss";
import useTodos from "@/hooks/todo";
import { v4 as uuidv4 } from "uuid";
import useSettings from "@/hooks/settings";
import { startOfToday } from "date-fns";
import DateToggle from "@/components/DateToggle";
import DatePicker from "@/components/DatePicker";

interface Props {
  label?: string;
}

const NewTaskModal: React.FC<Props> = ({ label = "Add Task" }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(startOfToday());
  const [isDisabled, setIsDisabled] = useState(true);
  const { addItem } = useTodos();
  const { settings, setSetting } = useSettings();

  useEffect(() => {
    if (title.length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [title]);

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setDueDate(startOfToday());
  };

  const onCancelHandler = () => {
    clearFields();
  };

  const onSaveHandler = () => {
    if (settings.newUser) setSetting("newUser", false);
    addItem({
      key: uuidv4(),
      title: title,
      description: description,
      completed: false,
      date: dueDate,
    });
    clearFields();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <TriggerButton>{label}</TriggerButton>
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
            <DatePicker value={dueDate} onChange={(date) => setDueDate(date)}>
              <DateToggle size="small" date={dueDate} />
            </DatePicker>
            <div className={styles.FooterActions}>
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
                  Add Task
                </TriggerButton>
              </Dialog.Close>
            </div>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewTaskModal;
