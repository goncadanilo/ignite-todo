import styles from "./styles.module.css";

interface CheckboxProps {
  isChecked: boolean;
  onChangeCheck: () => void;
}

export function Checkbox({ isChecked, onChangeCheck }: CheckboxProps) {
  return (
    <label className={styles.container}>
      <input type="checkbox" checked={isChecked} onChange={onChangeCheck} />
      <span></span>
    </label>
  );
}
