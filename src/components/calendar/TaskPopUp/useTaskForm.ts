import { useState } from "react"
import { ITask } from "../../../types/task"
import moment from "moment"

type TaskPopUpProps = {
  task: ITask
  onSave: (updatedTask: ITask) => void
}

const validateDate = (date: string) => {
  const now = moment()
  const eventDate = moment(date)

  if (eventDate.isBefore(now, "day")) {
    return "The date cannot be in the past."
  }

  return ""
}

const useTaskForm = ({ task, onSave }: TaskPopUpProps) => {
  console.log("useTaskForm  task:", task)
  const [formData, setFormData] = useState({
    name: task.name || "",
    notes: task.notes || "",
    date: task.date,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { date } = formData

    const errorMessage = validateDate(date)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setError("")

    const updatedTask = {
      ...task,
      ...formData,
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
