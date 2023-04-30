import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/Button";
import DialogOverlay from "@/components/DialogOverlay";
import DialogContent from "@/components/DialogContent";
import DialogFooter from "@/components/DialogFooter";

interface Props {}

const NewTaskModal: React.FC<Props> = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Add Task</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogFooter>
            <Dialog.Close asChild>
              <Button intent="secondary">Close</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Add Task</Button>
            </Dialog.Close>
          </DialogFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewTaskModal;
