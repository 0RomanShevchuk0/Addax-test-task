import { FC } from "react"
import PopUp from "../../ui/PopUp"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import useTaskForm from "./useTaskForm"
import { ITask } from "../../../types/task"

const emptyTask: ITask = {
  id: "",
  name: "",
  notes: "",
  start: new Date(),
  end: new Date(),
  color: "#000000",
}

type TaskPopUpProps = {
  tasks: ITask[]
  taskId: string | null
  onClose: () => void
  onSave: (updatedEvent: ITask) => void
  onDelete: (taskId: string) => void
}

const TaskPopUp: FC<TaskPopUpProps> = ({ tasks, taskId, onClose, onDelete, onSave }) => {
  const task = tasks.find((t) => t.id === taskId) || emptyTask
  const isNewTask = !task.id

  const { formData, error, handleChange, handleSubmit } = useTaskForm({ task, onSave })

  return (
    <PopUp onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-4">{isNewTask ? "Create Event" : "Edit Event"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <FormField
          label="Title"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Notes"
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <FormField
          label="Start Date & Time"
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
        />
        <FormField
          label="End Date & Time"
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
        />
        <FormField
          label="Color"
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <div className={`w-full flex space-x-2 ${isNewTask ? "justify-end" : "justify-between"}`}>
          {task && !isNewTask && (
            <Button
              type="button"
              onClick={() => onDelete(task.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          )}
          <div className="flex gap-3">
            <Button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-500">
              Cancel
            </Button>
            <Button type="submit">{isNewTask ? "Create" : "Save"}</Button>
          </div>
        </div>
      </form>
    </PopUp>
  )
}

export default TaskPopUp
