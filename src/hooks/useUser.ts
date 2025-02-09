import { useQuery } from "@tanstack/react-query"
import { authService } from "@/services/auth.service"
import { appQueries } from "@/configs/querues.config"

export function useUser() {
  const fiveMinutes = 5 * 60 * 1000

  const { data, isLoading } = useQuery({
    queryKey: [appQueries.user],
    queryFn: authService.getUserFromToken,
    retry: false,
    staleTime: fiveMinutes,
  })

  return { user: data?.user || null, isLoading }
}
