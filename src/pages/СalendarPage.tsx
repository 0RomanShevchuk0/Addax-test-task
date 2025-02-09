import moment from "moment"
import { useState } from "react"
import { useCalendarPopUp } from "@/components/calendar/useCalendarPopUp"
import { formatDate } from "@/utils/date.helpers"
import { useDebounce } from "@/hooks/useDebounce"
import { useTasks } from "@/hooks/useTasks"
import Input from "@/components/ui/Input"
import TaskPopUp from "@/components/calendar/TaskPopUp/TaskPopUp"
import CalendarBody from "@/components/calendar/calendar-body/CalendarBody"
import CalendarHeader from "@/components/calendar/CalendarHeader"

const CalendarPage = () => {
  const { selectedTaskId, openTaskPopUp, closeTaskPopup } = useCalendarPopUp()

  const [currentDate, setCurrentDate] = useState(formatDate(moment().startOf("month")))
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 700)

  const { tasks, isLoading, error } = useTasks({
    startDate: currentDate,
    endDate: formatDate(moment(currentDate).endOf("month")),
    name: debouncedSearch,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.log("Error loading tasks")
  }

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center">
        <Input
          placeholder="Search"
          className="w-3/12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 flex-grow">
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          openTaskPopUp={openTaskPopUp}
        />
        <CalendarBody currentDate={currentDate} tasks={tasks} openTaskPopUp={openTaskPopUp} />
      </div>

      {selectedTaskId && <TaskPopUp taskId={selectedTaskId} closePopUp={closeTaskPopup} />}
    </div>
  )
}

export default CalendarPage
