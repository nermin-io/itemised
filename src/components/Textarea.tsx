import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Textarea.module.scss";

const textarea = cva(styles.base, {
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

type TextareaAttr = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
>;

interface Props extends TextareaAttr, VariantProps<typeof textarea> {}

const Textarea: React.FC<Props> = ({
  size,
  variant,
  rows = 15,
  className,
  ...props
}) => {
  return (
    <textarea
      className={textarea({ size, variant, className })}
      {...props}
      rows={rows}
    />
  );
};

export default Textarea;
