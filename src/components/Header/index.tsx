import logoImg from "../../assets/todo-logo.svg";
import styles from "./styles.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <img src={logoImg} alt="Todo logo" />
    </div>
  );
}
