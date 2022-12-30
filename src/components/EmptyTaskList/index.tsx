import emptyImg from "../../assets/empty.svg";
import styles from "./styles.module.css";

export function EmptyTaskList() {
  return (
    <div className={styles.empty}>
      <img src={emptyImg} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}
