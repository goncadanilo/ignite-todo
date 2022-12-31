import { Trash } from "phosphor-react";
import { Checkbox } from "../Checkbox";
import styles from "./styles.module.css";

interface TaskItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
  onUpdateTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

export function TaskItem({
  id,
  title,
  isCompleted,
  onUpdateTaskStatus,
  onDeleteTask,
}: TaskItemProps) {
  function handleStatusChange() {
    onUpdateTaskStatus(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.taskItem}>
      <Checkbox isChecked={isCompleted} onChangeCheck={handleStatusChange} />
      <span className={isCompleted ? styles.titleWhenCompleted : ""}>
        {title}
      </span>
      <button title="Apagar tarefa" onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
