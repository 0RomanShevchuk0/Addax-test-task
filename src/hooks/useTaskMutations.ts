import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TaskFormStateType } from "./../types/task"
import { taskService } from "@/services/tasks.service"
import { appQueries } from "@/configs/querues.config"

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: TaskFormStateType) => taskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.tasks] })
    },
    onError: (error) => {
      console.error("Error creating task:", error)
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: TaskFormStateType }) =>
      taskService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.tasks] })
    },
    onError: (error) => {
      console.error("Error updating task:", error)
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.tasks] })
    },
    onError: (error) => {
      console.error("Error deleting task:", error)
    },
  })
}
