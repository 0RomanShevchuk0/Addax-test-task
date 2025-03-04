import { useState } from "react"
import { NEW_TASK_ID } from "@/constants/calendar.constants"

export type useCalendarPopUpReturnType = {
  selectedTaskId: string | null
  openTaskPopUp: (id: string | null) => void
  closeTaskPopup: () => void
}

export const useCalendarPopUp = (): useCalendarPopUpReturnType => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const openTaskPopUp = (id: string | null) => {
    setSelectedTaskId(id || NEW_TASK_ID)
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
