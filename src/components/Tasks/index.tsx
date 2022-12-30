import { PlusCircle } from "phosphor-react";
import { EmptyTaskList } from "../EmptyTaskList";
import styles from "./styles.module.css";

export function Tasks() {
  return (
    <article>
      <form className={styles.taskForm}>
        <input type="text" name="task" placeholder="Adicione uma nova tarefa" />
        <button type="submit">
          Criar <PlusCircle size={20} />
        </button>
      </form>

      <div>
        <div className={styles.header}>
          <strong className={styles.createdTasks}>
            Tarefas criadas <span>0</span>
          </strong>

          <strong className={styles.completedTasks}>
            Concluídas <span>0</span>
          </strong>
        </div>

        <EmptyTaskList />
      </div>
    </article>
  );
}
