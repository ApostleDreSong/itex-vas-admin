import React, { ReactNode } from "react";
import styles from "./Parentcontainer.module.scss";

export default function ParentContainer({ children }: { children: ReactNode }) {
  return <div className={styles.parent}>{children}</div>;
}
