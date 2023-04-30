import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Input.module.scss";

const input = cva(styles.base, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
    variant: {
      regular: styles.regular,
      text: styles.text,
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "regular",
  },
});

type InputAttr = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

interface Props extends InputAttr, VariantProps<typeof input> {}

const Input: React.FC<Props> = ({ variant, size, className, ...props }) => {
  return <input className={input({ variant, size, className })} {...props} />;
};

export default Input;
