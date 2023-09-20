import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./FileInput.module.scss";
import { UploadIcon } from "@radix-ui/react-icons";

const classNames = cva(styles.base, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
      media: styles.media,
    },
  },
  defaultVariants: {
    size: "medium",
    intent: "media",
  },
});

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
>;

interface Props extends InputProps, VariantProps<typeof classNames> {
  label?: string;
  innerRef?: React.ForwardedRef<HTMLInputElement>;
}

const FileInput: React.FC<Props> = ({
  intent,
  size,
  innerRef,
  label = "Import",
  className,
  ...props
}) => {
  return (
    <div className={classNames({ intent, size, className })}>
      <input id="file" type="file" ref={innerRef} {...props} />
      <label tabIndex={0} role="button" htmlFor="file">
        <UploadIcon /> {label}
      </label>
    </div>
  );
};

export default FileInput;
