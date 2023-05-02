import React from "react";
import styles from "./EmptyState.module.scss";

interface Props {
  newUser: boolean;
}

const EmptyState: React.FC<Props> = ({ newUser }) => {
  if (newUser)
    return (
      <div className={styles.EmptyState}>
        <h1>Welcome</h1>
        <p>Click &quot;Add Task&quot; to get started</p>
      </div>
    );

  return (
    <div className={styles.EmptyState}>
      <h1>You&apos;re all done!</h1>
      <p>Be proud of yourself.</p>
    </div>
  );
};

export default EmptyState;
