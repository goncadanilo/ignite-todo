import { countBy, orderBy } from "lodash";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setTasks(tasksWithUpdatedOne);
  }

  function deleteTask(taskId: number) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId);

    setTasks(tasksWithoutDeletedOne);
  }

  useEffect(() => {
    const { true: completedCount } = countBy(tasks, "isCompleted");
    setCompletedTaskCount(completedCount || 0);
  }, [tasks]);

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
              onDeleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </article>
  );
}
