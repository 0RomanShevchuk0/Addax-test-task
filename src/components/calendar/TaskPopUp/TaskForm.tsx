import { FC } from "react"
import FormField from "@/components/ui/FormField"
import Button from "@/components/ui/Button"
import { useForm, SubmitHandler } from "react-hook-form"
import { ITask, TaskFormStateType } from "@/types/task"
import moment from "moment"
import { useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/useTaskMutations"
import { defaultTaskColor } from "@/constants/calendar.constants"

type TaskFormProps = {
  task?: ITask
  closePopUp: () => void
}

const TaskForm: FC<TaskFormProps> = ({ task, closePopUp }) => {
  const isNewTask = !task?.id

  const formValues: Required<TaskFormStateType> = {
    name: task?.name || "",
    notes: task?.notes || "",
    date: task?.date || moment(new Date()).format("YYYY-MM-DD"),
    color: task?.color || defaultTaskColor,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Required<TaskFormStateType>>({ values: formValues })

  const createTaskMutation = useCreateTask()
  const updateTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTask()

  const onSubmit: SubmitHandler<Required<TaskFormStateType>> = async (data) => {
    try {
      if (isNewTask) {
        await createTaskMutation.mutateAsync(data)
        console.log("Task created successfully:", task)
      } else {
        await updateTaskMutation.mutateAsync({ id: task.id, task: data })
        console.log("Task updated successfully:", task)
      }
      closePopUp()
    } catch (err) {
      console.error("Error saving task:", err)
    }
  }

  const handleTaskDelete = async (taskId: string) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId)
      console.log("Task deleted successfully:", taskId)
      closePopUp()
    } catch (err) {
      console.error("Error deleting task:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <FormField
        label="Name"
        type="text"
        register={register("name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        })}
        error={errors.name}
      />
      <FormField label="Notes" type="text" register={register("notes")} error={errors.notes} />
      <FormField
        label="Date"
        type="date"
        register={register("date", { required: true })}
        error={errors.date}
      />
      <FormField label="Color" type="color" register={register("color")} error={errors.color} />

      <div className={`w-full flex space-x-2 ${isNewTask ? "justify-end" : "justify-between"}`}>
        {task && !isNewTask && (
          <Button
            type="button"
            onClick={() => handleTaskDelete(task.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        )}
        <div className="flex gap-3">
          <Button type="button" onClick={closePopUp} className="bg-gray-400 hover:bg-gray-500">
            Cancel
          </Button>
          <Button type="submit">{isNewTask ? "Create" : "Save"}</Button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm
