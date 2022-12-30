import { PlusCircle } from "phosphor-react";
import { EmptyTaskList } from "../EmptyTaskList";
import styles from "./styles.module.css";

interface TaskData {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([] as TaskData[]);
  const [newTaskText, setNewTaskText] = useState("");

  const isTaskListEmpty = tasks.length === 0;
  const isNewTaskEmpty = newTaskText.trim().length === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks((state) => {
      return [
        ...state,
        {
          id: state.length + 1,
          title: newTaskText,
          isCompleted: false,
        },
      ];
    });

    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é Obrigatório!");
  }

  return (
    <article>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button type="submit" disabled={isNewTaskEmpty}>
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
