import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop"
import { initialTasks } from "../../mockData"
import { ITask } from "../../types/task"
import { useState } from "react"

type UseCalendarReturnType = {
  tasks: ITask[]
  selectedTaskId: string | null
  openTaskPopUp: (id: string | null, isNew?: boolean) => void
  closeTaskPopup: () => void
  handleTaskSave: (task: ITask) => void
  handleTaskDelete: (taskId: string) => void
  moveTask: (args: EventInteractionArgs<ITask>) => void
  getTaskStyle: (task: ITask) => object
}

export const useCalendar = (): UseCalendarReturnType => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const _addTask = (task: ITask) => {
    setTasks((prev) => [...prev, task])
  }
  const _updateTask = (updatedTask: ITask) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }
  const _deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const openTaskPopUp = (id: string | null, isNew?: boolean) => {
    setSelectedTaskId(isNew ? crypto.randomUUID() : id)
  }

  const closeTaskPopup = () => {
    setSelectedTaskId(null)
  }

  const handleTaskSave = (task: ITask) => {
    const isNewTask = !task.id

    if (isNewTask) {
      _addTask(task)
    } else {
      _updateTask(task)
    }

    closeTaskPopup()
  }

  const handleTaskDelete = (id: string) => {
    _deleteTask(id)
    closeTaskPopup()
  }

  const moveTask = ({ event: task, start, end }: EventInteractionArgs<ITask>) => {
    const updatedTask: ITask = {
      ...task,
      start: new Date(start),
      end: new Date(end),
    }

    _updateTask(updatedTask)
  }

  const getTaskStyle = (task: ITask) => ({
    style: {
      backgroundColor: task.color,
      border: "none",
    },
  })

  return {
    selectedTaskId,
    getTaskStyle,
    openTaskPopUp,
    closeTaskPopup,
    tasks,
    handleTaskDelete,
    moveTask,
    handleTaskSave,
  }
}
