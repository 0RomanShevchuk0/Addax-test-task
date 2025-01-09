import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from "moment"
import TaskPopUp from "./TaskPopUp/TaskPopUp"
import Button from "../ui/Button"
import { ITask } from "../../types/task"
import { useCalendar } from "./useCalendar"
import Input from "../ui/Input"
import { useState, useCallback } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useTasks } from "../../hooks/useTasks"
import { formatDate } from "../../utils/date.helpers"

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop<ITask>(Calendar)

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

const MyCalendar = () => {
  const {
    selectedTaskId,
    handleTaskDelete,
    getTaskStyle,
    openTaskPopUp,
    closeTaskPopup,
    moveTask,
    handleTaskSave,
  } = useCalendar()

  const [currentDate, setCurrentDate] = useState(formatDate(moment().startOf("month")))
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 700)

  const { tasks, isLoading, error } = useTasks({
    startDate: currentDate,
    endDate: formatDate(moment(currentDate).endOf("month")),
    name: debouncedSearch,
  })

  const handleMonthChange = useCallback((newDate: Date) => {
    setCurrentDate(formatDate(moment(newDate).startOf("month")))
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tasks</div>

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <Input
          placeholder="Search"
          className="w-3/12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => openTaskPopUp(null, true)} className="flex-shrink-0">
          Create Task
        </Button>
      </div>

      <div className="flex-grow">
        <DnDCalendar
          localizer={localizer}
          events={tasks}
          onEventDrop={moveTask}
          startAccessor="date"
          endAccessor="date"
          titleAccessor="name"
          views={["month", "week", "day"]}
          defaultView="month"
          onSelectEvent={(task) => openTaskPopUp(task.id, false)}
          eventPropGetter={getTaskStyle}
          popup={true}
          onNavigate={handleMonthChange}
          defaultDate={currentDate}
        />
      </div>

      {selectedTaskId && (
        <TaskPopUp
          tasks={tasks}
          taskId={selectedTaskId}
          onClose={closeTaskPopup}
          onSave={handleTaskSave}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  )
}

export default MyCalendar
