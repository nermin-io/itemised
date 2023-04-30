import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import styles from "./DialogOverlay.module.scss";

interface Props {}

const DialogOverlay: React.FC<Props> = () => {
  return <Dialog.Overlay className={styles.DialogOverlay} />;
};

export default DialogOverlay;
