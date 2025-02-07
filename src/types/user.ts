import { PaginationParamsType } from "./pagination"

export interface IUser {
  id: string
  email: string
}

export type UsersQueryParamsType = {
  email?: string
} & PaginationParamsType
