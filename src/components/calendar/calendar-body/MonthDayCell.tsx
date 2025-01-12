import moment from "moment"
import { FC } from "react"
import { ITask } from "../../../types/task"

type MonthDayCellsProps = {
  momentDay: moment.Moment
  dayTasks: ITask[]
  styleConditions: { isToday: boolean; isLastRow: boolean; isLastCol: boolean }
  openTaskPopUp: (taskId: string | null) => void
}

const MonthDayCell: FC<MonthDayCellsProps> = ({
  momentDay,
  dayTasks,
  styleConditions,
  openTaskPopUp,
}) => {
  const { isToday, isLastCol, isLastRow } = styleConditions

  const TasksElements = dayTasks.map((t) => (
    <div
      key={t.id}
      className="bg-blue-500 text-white text-xs rounded-md px-2 py-1 truncate flex-shrink-0 hover:cursor-pointer"
      style={{ background: t.color }}
      onClick={() => openTaskPopUp(t.id)}
    >
      {t.name}
    </div>
  ))

  return (
    <div
      className={`overflow-y-auto flex flex-col gap-1 p-2 border-gray-200 border-t border-l ${isToday ? "bg-white" : "bg-gray-100 -mr-[1px]"} ${isLastRow ? "border-b" : ""} ${isLastCol ? "border-r" : ""}`}
    >
      <div className="self-end ext-sm font-medium">{momentDay.date()}</div>
      <div className="flex flex-col gap-1 overflow-y-auto flex-grow">{TasksElements}</div>
    </div>
  )
}

export default MonthDayCell
