import { ITask, TaskFormStateType } from "./../types/task"
import { useMutation } from "@tanstack/react-query"
import { taskService } from "../services/tasks.service"

export const useCreateTask = (task: TaskFormStateType) => {
  const { data, isPending, error } = useMutation({
    mutationFn: () => taskService.createTask(task),
  })
  return { data, isPending, error }
}

export const useUpdateTask = (task: ITask) => {
  const { data, isPending, error } = useMutation({
    mutationFn: () => taskService.updateTask(task),
  })
  return { data, isPending, error }
}

export const useDeleteTask = (id: string) => {
  const { data, isPending, error } = useMutation({
    mutationFn: () => taskService.deleteTask(id),
  })
  return { data, isPending, error }
}
