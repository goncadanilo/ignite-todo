import styles from "./styles.module.css";

interface WrapperProps {
  children: JSX.Element;
}

export function Wrapper({ children }: WrapperProps) {
  return <main className={styles.wrapper}>{children}</main>;
}
