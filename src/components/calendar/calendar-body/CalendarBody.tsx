import { FC, useEffect, useState } from "react"
import { type ITask } from "@/types/task"
import WeekDayHeader from "@/components/calendar/calendar-body/WeekDayHeader"
import MonthDayCell from "./MonthDayCell"
import { formatDate } from "@/utils/date.helpers"
import { getMonthDays } from "@/utils/calendar.helpers"
import moment from "moment"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { useUpdateTask } from "@/hooks/useTaskMutations"
import { useHolidays } from "@/hooks/useHolidays"
import { WEEK_DAY_NAMES } from "@/constants/calendar.constants"

type CalendarProps = {
  currentDate: string
  tasks: ITask[]
  openTaskPopUp: (taskId: string | null) => void
}

const CalendarBody: FC<CalendarProps> = ({ currentDate, tasks, openTaskPopUp }) => {
  const [localTasks, setLocalTasks] = useState<ITask[]>(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  const monthDays = getMonthDays(currentDate)

  const { holidays, isLoading } = useHolidays()

  const updateTaskMutation = useUpdateTask()
  const moveTask = async (originalTask: ITask, date: string) => {
    const updatedTask = { ...originalTask, date }
    setLocalTasks((prev) => [...prev.filter((t) => t.id !== originalTask.id), updatedTask])

    try {
      await updateTaskMutation.mutateAsync({ id: originalTask.id, task: updatedTask })
    } catch (error) {
      console.error("Error moving task")
      setLocalTasks((prev) => [...prev.filter((t) => t.id !== originalTask.id), originalTask])
    }
  }

  const WeekdayHeaderCells = WEEK_DAY_NAMES.map((day, index) => {
    const isLastCol = index === WEEK_DAY_NAMES.length - 1
    return <WeekDayHeader key={day} day={day} isLastCol={isLastCol} />
  })

  const MonthDayCells = monthDays.map((momentDay, index) => {
    const isToday = momentDay.isSame(moment(), "day")
    const isCurrentMonth = momentDay.isSame(currentDate, "month")
    const isLastRow = Math.floor(index / 7) === Math.floor((monthDays.length - 1) / 7)
    const isLastCol = index % 7 === 6

    const dayTasks = localTasks.filter((t) => momentDay.isSame(t.date))

    const dayHoliday = holidays?.find((h: any) => momentDay.isSame(h.date))

    return (
      <MonthDayCell
        key={formatDate(momentDay)}
        momentDay={momentDay}
        dayTasks={dayTasks}
        holidayName={dayHoliday?.name}
        styleConditions={{ isToday, isLastCol, isLastRow, isCurrentMonth }}
        openTaskPopUp={openTaskPopUp}
        onDrop={moveTask}
      />
    )
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border-gray-200 flex-grow flex flex-col">
        <div className="grid grid-cols-7 auto-rows-[min-content]">{WeekdayHeaderCells}</div>
        <div className={`flex-grow grid grid-cols-7 auto-rows-[20%]`}>{MonthDayCells}</div>
      </div>
    </DndProvider>
  )
}

export default CalendarBody
