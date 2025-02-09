import moment from "moment"
import { FC } from "react"
import { ITask } from "@/types/task"
import { useDrop } from "react-dnd"
import DraggableTask from "@/components/calendar/calendar-body/DraggableTask"
import { formatDate } from "@/utils/date.helpers"
import { taskDnDKey } from "@/constants/calendar.constants"

type MonthDayCellsProps = {
  momentDay: moment.Moment
  dayTasks: ITask[]
  holidayName: string
  styleConditions: {
    isToday: boolean
    isLastRow: boolean
    isLastCol: boolean
    isCurrentMonth: boolean
  }
  openTaskPopUp: (taskId: string | null) => void
  onDrop: (task: ITask, date: string) => void
}

const MonthDayCell: FC<MonthDayCellsProps> = ({
  momentDay,
  dayTasks,
  holidayName,
  styleConditions,
  openTaskPopUp,
  onDrop: onDrop,
}) => {
  const { isToday, isLastCol, isLastRow, isCurrentMonth } = styleConditions

  const [, drop] = useDrop({
    accept: taskDnDKey,
    drop: ({ task }: { task: ITask }) => onDrop(task, formatDate(momentDay)),
  })

  const TasksElements = dayTasks.map((t) => (
    <DraggableTask key={t.id} task={t} openTaskPopUp={openTaskPopUp} />
  ))

  return (
    <div
      ref={drop}
      className={`flex flex-col gap-1 p-2 border-gray-200 border-t border-l ${isCurrentMonth ? "bg-white" : "bg-gray-100"} ${isLastRow ? "border-b" : ""} ${isLastCol ? "border-r" : ""} overflow-y-auto`}
    >
      <div className="w-full flex justify-between items-center">
        {holidayName && (
          <span className="text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded-md font-light shadow-sm">
            {holidayName}
          </span>
        )}
        <span
          className={`ml-auto text-sm font-medium px-2 py-0.5 rounded-full ${isToday ? "text-white bg-red-500" : "text-gray-700"}`}
        >
          {momentDay.date()}
        </span>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto flex-grow">{TasksElements}</div>
    </div>
  )
}

export default MonthDayCell
