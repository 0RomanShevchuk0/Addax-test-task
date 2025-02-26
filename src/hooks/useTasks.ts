import { useQuery } from "@tanstack/react-query"
import { fetchAllTasks } from "@/utils/fetchAllItems"
import { PaginationParamsType } from "@/types/pagination"
import { taskService } from "@/services/tasks.service"
import { TasksQueryParamsType } from "@/types/task"
import { appQueries } from "@/configs/querues.config"

export function useTasks(params: TasksQueryParamsType) {
  const { data, isLoading, error } = useQuery({
    queryKey: [appQueries.tasks, params.startDate, params.endDate, params.name],
    queryFn: () =>
      fetchAllTasks((p: PaginationParamsType) => taskService.getTasks({ ...params, ...p })),
    retry: false,
  })

  return { tasks: data || [], isLoading, error }
}

export function useSingleTask(taskId: string, enabled: boolean) {
  const { data, isLoading, error } = useQuery({
    queryKey: [taskId],
    queryFn: () => taskService.getTaskById(taskId),
    enabled: enabled,
		retry: false
  })
  return { data: data?.data, isLoading, error }
}
