import { AxiosResponse } from "axios"
import { PaginationParamsType, PaginationResponse } from "../types/pagination"

export const fetchAllTasks = async <T>(
  request: (params: PaginationParamsType) => Promise<AxiosResponse<PaginationResponse<T>>>
) => {
  let allItems: T[] = []
  let page = 1
  const pageSize = 20

  while (true) {
    const response = await request({ page, pageSize })
    allItems = [...allItems, ...response.data.items]

    if (!response.data.hasNextPage) break
    page++
  }

  return allItems
}
