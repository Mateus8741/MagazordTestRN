import { useState } from 'react';

import { useStorage } from './useStorage';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { addTask: add, toggleTask: toggle, tasks: tks } = useStorage();

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: tks.length + 1,
      title: `Tarefa ${tks.length + 1}`,
      description: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    add(newTask);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);

    toggle(id);
  };

  return {
    addTask,
    toggleTask,
  };
}
