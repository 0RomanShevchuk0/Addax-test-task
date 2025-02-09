import { useState } from "react"
import { newTaskId } from "@/constants/calendar.constants"

export type useCalendarPopUpReturnType = {
  selectedTaskId: string | null
  openTaskPopUp: (id: string | null) => void
  closeTaskPopup: () => void
}

export const useCalendarPopUp = (): useCalendarPopUpReturnType => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const openTaskPopUp = (id: string | null) => {
    setSelectedTaskId(id || newTaskId)
  }

  const closeTaskPopup = () => {
    setSelectedTaskId(null)
  }

  return {
    selectedTaskId,
    openTaskPopUp,
    closeTaskPopup,
  }
}
