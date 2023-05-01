import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Label.module.scss";

const label = cva(styles.base, {
  variants: {},
  defaultVariants: {},
});

interface Props
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof label> {
  children: string;
}

const Label: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <label className={label({ className })} {...props}>
      {children}
    </label>
  );
};

export default Label;
