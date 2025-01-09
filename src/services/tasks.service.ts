import { axiosClassic } from "../api/config"
import { PaginationResponse } from "../types/pagination"
import { ITask, TaskFormStateType, TasksQueryParamsType } from "../types/task"

class TaskService {
  private BASE_URL = "/tasks"

  async getTasks(params?: TasksQueryParamsType) {
    const queryParams = Object.entries(params || {})
      .map(([param, value]) => `${param}=${value}`)
      .join("&")
    const response = await axiosClassic.get<PaginationResponse<ITask>>(
      `${this.BASE_URL}?${queryParams}`
    )
    return response
  }

  async getTaskById(id: string) {
    const response = await axiosClassic.get(`this.baseURL/${id}`)
    return response
  }

  async createTask(task: TaskFormStateType) {
    const response = await axiosClassic.post(this.BASE_URL, task)
    return response
  }

  async updateTask(task: ITask) {
    const response = await axiosClassic.patch(this.BASE_URL, task)
    return response
  }

  async deleteTask(id: string) {
    const response = await axiosClassic.delete(`this.baseURL/${id}`)
    return response
  }
}

export const taskService = new TaskService()
