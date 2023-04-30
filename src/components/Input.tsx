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
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "regular",
    intent: "secondary",
  },
});

type InputAttr = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

interface Props extends InputAttr, VariantProps<typeof input> {}

const Input: React.FC<Props> = ({
  intent,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <input className={input({ intent, variant, size, className })} {...props} />
  );
};

export default Input;
