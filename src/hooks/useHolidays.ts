import { appQueries } from "@/configs/querues.config"
import { holidaysService } from "@/services/holidays.service"
import { useQuery } from "@tanstack/react-query"

export function useHolidays() {
  const { data: holidaysResponse, isLoading } = useQuery({
    queryKey: [appQueries.holidays],
    queryFn: holidaysService.getAllHolidays,
  })

  return { holidays: holidaysResponse?.data || [], isLoading }
}
