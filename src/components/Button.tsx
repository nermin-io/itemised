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
  innerRef?: React.ForwardedRef<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({
  children,
  className,
  intent,
  size,
  innerRef,
  ...props
}) => {
  return (
    <button
      ref={innerRef}
      className={button({ intent, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export const TriggerButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ innerRef, ...props }, ref) => (
    <Button innerRef={ref} {...props}>
      {props.children}
    </Button>
  )
);

export default Button;
