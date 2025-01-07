import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from "moment"
import TaskPopUp from "./TaskPopUp/TaskPopUp"
import Button from "../ui/Button"
import { ITask } from "../../types/task"
import { useCalendar } from "./useCalendar"
import Input from "../ui/Input"
import { useState, useEffect } from "react"
import { useDebounce } from "../../hooks/useDebounce"

const localizer = momentLocalizer(moment)

const DnDCalendar = withDragAndDrop<ITask>(Calendar)

const holidays = [
  {
    date: "2025-01-07",
    localName: "عيد الميلاد المجيد",
    name: "Christmas",
    countryCode: "EG",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-08",
    localName: "Božić",
    name: "Orthodox Christmas Day",
    countryCode: "ME",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Optional"],
  },
  {
    date: "2025-01-09",
    localName: "Martyr's Day",
    name: "Martyr's Day",
    countryCode: "PA",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-10",
    localName: "Traditional Day",
    name: "Traditional Day",
    countryCode: "BJ",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-10",
    localName: "Majority Rule Day",
    name: "Majority Rule Day",
    countryCode: "BS",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-11",
    localName: "Takdim watikat al-istiqlal",
    name: "Proclamation of Independence",
    countryCode: "MA",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-13",
    localName: "成人の日",
    name: "Coming of Age Day",
    countryCode: "JP",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-13",
    localName: "Natalicio de Eugenio María de Hostos",
    name: "Birthday of Eugenio María de Hostos",
    countryCode: "PR",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-14",
    localName: "Id Yennayer",
    name: "Amazigh New Year",
    countryCode: "MA",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-14",
    localName: "Revolution and Youth Day",
    name: "Revolution and Youth Day",
    countryCode: "TN",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2025-01-14",
    localName: "Día de la Divina Pastora",
    name: "Feast of the Divina Pastora",
    countryCode: "VE",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Observance"],
  },
]

const MyCalendar = () => {
  const {
    tasks,
    selectedTaskId,
    handleTaskDelete,
    getTaskStyle,
    openTaskPopUp,
    closeTaskPopup,
    moveTask,
    handleTaskSave,
  } = useCalendar()

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    console.log("MyCalendar  search:", debouncedSearch)
  }, [debouncedSearch])

  return (
    <div className="h-full">
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

      <DnDCalendar
        localizer={localizer}
        events={tasks}
        onEventDrop={moveTask}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="name"
        views={["month", "week", "day"]}
        defaultView="month"
        onSelectEvent={(task) => openTaskPopUp(task.id, false)}
        eventPropGetter={getTaskStyle}
        popup={true}
        dayPropGetter={(date) => {
          const holiday = holidays.find(
            (holiday) => moment(date).format("YYYY-MM-DD") === holiday.date
          )

          if (holiday) {
            return {
              className: holiday.name ? "bg-yellow-200" : "",
              title: holiday.name,
            }
          }

          return {}
        }}
      />

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
