import { FC } from "react"
import PopUp from "../../ui/PopUp"
import { useSingleTask } from "../../../hooks/useTasks"
import { newTaskId } from "../../../constants/calendar.constants"
import TaskForm from "./TaskForm"

type TaskPopUpProps = {
  taskId: string
  closePopUp: () => void
}

const TaskPopUp: FC<TaskPopUpProps> = ({ taskId, closePopUp }) => {
  const isNewTask = taskId === newTaskId
  const { data: task, isLoading, error } = useSingleTask(taskId, !isNewTask)

  const renderLoading = <div className="text-center py-4">Loading...</div>
  const renderError = error && (
    <p className="text-red-500 text-sm text-center">
      {error.message || "An error occurred while fetching the task."}
    </p>
  )
  const renderTaskForm = !isLoading && task && <TaskForm task={task} closePopUp={closePopUp} />

  return (
    <PopUp onClose={closePopUp}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold mb-4">{isNewTask ? "Create Event" : "Edit Event"}</h2>
        {isLoading ? renderLoading : renderTaskForm}
        {renderError}
      </div>
    </PopUp>
  )
}

export default TaskPopUp
