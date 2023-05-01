import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Checkbox.module.scss";
import CheckIcon from "./icons/CheckIcon";

const checkbox = cva(styles.base, {
  variants: {},
});

interface Props
  extends RadixCheckbox.CheckboxProps,
    VariantProps<typeof checkbox> {
  className?: string;
}

const Checkbox: React.FC<Props> = ({ className, ...props }) => {
  return (
    <RadixCheckbox.Root className={checkbox({ className })} {...props}>
      <RadixCheckbox.Indicator className={styles.indicator}>
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};

export default Checkbox;
