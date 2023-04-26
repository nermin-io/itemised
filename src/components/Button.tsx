import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Button.module.scss";

const button = cva(styles.base, {
  variants: {
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode | React.ReactNode[];
}

const Button: React.FC<Props> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button className={button({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
