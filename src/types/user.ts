import { PaginationParamsType } from "./pagination"

export interface IUser {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
}

export type UsersQueryParamsType = {
  email?: string
} & PaginationParamsType
