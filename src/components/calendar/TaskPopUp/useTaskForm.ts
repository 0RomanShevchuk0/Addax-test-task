import { useState } from "react"
import {
  formatDateToDatetimeLocal,
  parseDatetimeLocalToDate,
} from "../../../utils/dateUtils"
import { ITask } from "../../../types/task"

type TaskPopUpProps = {
  task: ITask
  onSave: (updatedTask: ITask) => void
}

const useTaskForm = ({ task, onSave }: TaskPopUpProps) => {
  const [formData, setFormData] = useState({
    name: task.name || "",
    notes: task.notes || "",
    start: formatDateToDatetimeLocal(task.start),
    end: formatDateToDatetimeLocal(task.end),
    color: task.color || "#000000",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateDates = (start: Date, end: Date) => {
    const now = new Date()
    if (start < now || end < now) {
      return "Dates cannot be in the past."
    }
    if (start >= end) {
      return "Start date and time must be before end date and time."
    }
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { start, end } = formData
    const startDate = parseDatetimeLocalToDate(start)
    const endDate = parseDatetimeLocalToDate(end)

    const errorMessage = validateDates(startDate, endDate)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setError("")

    const updatedTask = {
      ...task,
      ...formData,
      start: startDate,
      end: endDate,
    }

    onSave(updatedTask)
  }

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
  }
}

export default useTaskForm
