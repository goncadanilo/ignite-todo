import { orderBy } from "lodash";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { EmptyTaskList } from "../EmptyTaskList";
import { TaskItem } from "../TaskItem";
import styles from "./styles.module.css";

interface TaskData {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([] as TaskData[]);
  const [newTaskText, setNewTaskText] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const isTaskListEmpty = tasks.length === 0;
  const isNewTaskEmpty = newTaskText.trim().length === 0;
  const tasksSortedByStatus = orderBy(tasks, ["isCompleted"]);

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

  function updateTaskStatus(taskId: number) {
    const tasksWithUpdatedOne = tasks.map((task) => {
      if (task.id === taskId) {
        setCompletedTaskCount((state) =>
          task.isCompleted ? state - 1 : state + 1
        );
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setTasks(tasksWithUpdatedOne);
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
            Tarefas criadas <span>{tasks.length}</span>
          </strong>

          <strong className={styles.completedTasks}>
            Concluídas{" "}
            <span>
              {isTaskListEmpty ? 0 : `${completedTaskCount} de ${tasks.length}`}
            </span>
          </strong>
        </div>

        {isTaskListEmpty ? (
          <EmptyTaskList />
        ) : (
          tasksSortedByStatus.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              onUpdateTaskStatus={updateTaskStatus}
            />
          ))
        )}
      </div>
    </article>
  );
}
