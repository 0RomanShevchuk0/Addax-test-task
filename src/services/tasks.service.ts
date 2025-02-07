import { axiosWithAuth } from "../api/config"
import { PaginationResponse } from "../types/pagination"
import { ITask, TaskFormStateType, TasksQueryParamsType } from "../types/task"

class TaskService {
  private BASE_URL = "/tasks"

  getTasks = async (params?: TasksQueryParamsType) => {
    const queryParams = Object.entries(params || {})
      .map(([param, value]) => `${param}=${value}`)
      .join("&")
    const response = await axiosWithAuth.get<PaginationResponse<ITask>>(
      `${this.BASE_URL}?${queryParams}`
    )
    return response
  }

  getTaskById = async (id: string) => {
    const response = await axiosWithAuth.get<ITask>(`${this.BASE_URL}/${id}`)
    return response
  }

  createTask = async (task: TaskFormStateType) => {
    const response = await axiosWithAuth.post(this.BASE_URL, task)
    return response
  }

  updateTask = async (id: string, task: TaskFormStateType) => {
    const response = await axiosWithAuth.patch(`${this.BASE_URL}/${id}`, task)
    return response
  }

  deleteTask = async (id: string) => {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const taskService = new TaskService()
