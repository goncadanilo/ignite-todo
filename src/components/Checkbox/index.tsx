import styles from "./styles.module.css";

interface CheckboxProps {
  checked: boolean;
}

export function Checkbox({ checked }: CheckboxProps) {
  return (
    <label className={styles.container}>
      <input type="checkbox" />
      <span></span>
    </label>
  );
}
