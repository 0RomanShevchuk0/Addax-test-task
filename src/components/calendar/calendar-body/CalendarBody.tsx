import { FC } from "react"
import { type ITask } from "../../../types/task"
import WeekDayHeader from "./WeekDayHeader"
import MonthDayCell from "./MonthDayCell"
import { formatDate } from "../../../utils/date.helpers"
import { getMonthDays } from "../../../utils/calendar.helpers"

type CalendarProps = {
  currentDate: string
  tasks: ITask[]
  openTaskPopUp: (taskId: string | null) => void
}

// const holidays = [
//   {
//     date: "2025-01-07",
//     localName: "عيد الميلاد المجيد",
//     name: "Christmas",
//     countryCode: "EG",
//     fixed: false,
//     global: true,
//     counties: null,
//     launchYear: null,
//     types: ["Public"],
//   },
//   {
//     date: "2025-01-08",
//     localName: "Božić",
//     name: "Orthodox Christmas Day",
//     countryCode: "ME",
//     fixed: false,
//     global: true,
//     counties: null,
//     launchYear: null,
//     types: ["Optional"],
//   },
// ]

const CalendarBody: FC<CalendarProps> = ({ currentDate, tasks, openTaskPopUp }) => {
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const monthDays = getMonthDays(currentDate)

  const WeekdayHeaderCells = weekDayNames.map((day, index) => {
    const isLastCol = index === weekDayNames.length - 1
    return <WeekDayHeader key={day} day={day} isLastCol={isLastCol} />
  })

  const MonthDayCells = monthDays.map((momentDay, index) => {
    const isToday = momentDay.isSame(currentDate, "month")
    const isLastRow = Math.floor(index / 7) === Math.floor((monthDays.length - 1) / 7)
    const isLastCol = index % 7 === 6

    const dayTasks = tasks.filter((t) => momentDay.isSame(t.date))

    return (
      <MonthDayCell
        key={formatDate(momentDay)}
        momentDay={momentDay}
        dayTasks={dayTasks}
        styleConditions={{ isToday, isLastCol, isLastRow }}
        openTaskPopUp={openTaskPopUp}
      />
    )
  })

  return (
    <div className="border-gray-200 flex-grow flex flex-col">
      <div className="grid grid-cols-7 auto-rows-[min-content]">{WeekdayHeaderCells}</div>
      <div className="flex-grow grid grid-cols-7 auto-rows-[20%]">{MonthDayCells}</div>
    </div>
  )
}

export default CalendarBody
