import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.scss";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    RadixSwitch.SwitchProps {}

const Switch: React.FC<Props> = ({ className, ...props }) => {
  return (
    <RadixSwitch.Root className={styles.SwitchRoot} {...props}>
      <RadixSwitch.Thumb className={styles.SwitchThumb} />
    </RadixSwitch.Root>
  );
};

export default Switch;
