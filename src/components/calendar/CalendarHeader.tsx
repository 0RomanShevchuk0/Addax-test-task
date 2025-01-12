import { type Dispatch, type FC } from "react"
import Button from "../ui/Button"
import moment from "moment"
import { formatDate } from "../../utils/date.helpers"

type CalendarHeaderProps = {
  currentDate: string
  setCurrentDate: Dispatch<React.SetStateAction<string>>
  openTaskPopUp: (taskId: string | null) => void
}

const calendarButtonClass =
  "px-4 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 hover:border-gray-300 rounded-none -mr-[1px]"

const CalendarHeader: FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
  openTaskPopUp,
}) => {
  const changeMonth = (type: "next" | "prev" | "current") => () => {
    const changeDateActions = {
      current: moment(),
      next: moment(currentDate).add(1, "month"),
      prev: moment(currentDate).subtract(1, "month"),
    }
    setCurrentDate(formatDate(changeDateActions[type]))
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <button
            className={`${calendarButtonClass} rounded-l-md`}
            onClick={changeMonth("current")}
          >
            Today
          </button>
          <button className={`${calendarButtonClass}`} onClick={changeMonth("prev")}>
            Back
          </button>
          <button className={`${calendarButtonClass} rounded-r-md`} onClick={changeMonth("next")}>
            Next
          </button>
        </div>
        <div>{moment(currentDate).format("MMMM YYYY")}</div>
        <Button onClick={() => openTaskPopUp(null)} className="flex-shrink-0">
          Create Task
        </Button>
      </div>
    </div>
  )
}

export default CalendarHeader
