import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/Button";
import DialogOverlay from "@/components/DialogOverlay";
import DialogContent from "@/components/DialogContent";
import DialogFooter from "@/components/DialogFooter";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

interface Props {}

const NewTaskModal: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Add Task</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
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
              <Button size="small" intent="secondary">
                Close
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button size="small">Add Task</Button>
            </Dialog.Close>
          </DialogFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewTaskModal;
