import { Trash } from "phosphor-react";
import { Checkbox } from "../Checkbox";
import styles from "./styles.module.css";

interface TaskItemProps {
  title: string;
  isCompleted: boolean;
}

export function TaskItem({ title, isCompleted }: TaskItemProps) {
  return (
    <div className={styles.taskItem}>
      <Checkbox checked={isCompleted} />
      <span>{title}</span>
      <button title="Apagar tarefa">
        <Trash size={20} />
      </button>
    </div>
  );
}
