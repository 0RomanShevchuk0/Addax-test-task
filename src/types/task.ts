import { PaginationParamsType } from "./pagination"

export interface ITask {
  id: string
  name: string
  date: string
  notes?: string
  color?: string
}

export type TaskFormStateType = Partial<Omit<ITask, "id">>

export type TasksQueryParamsType = {
  name?: string
  startDate?: string
  endDate?: string
} & PaginationParamsType
