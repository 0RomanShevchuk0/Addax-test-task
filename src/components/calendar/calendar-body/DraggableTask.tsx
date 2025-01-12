import { FC } from "react"
import { ITask } from "../../../types/task"
import { useDrag } from "react-dnd"

type DraggableTaskProps = {
  task: ITask
  openTaskPopUp: (taskId: string | null) => void
}

const DraggableTask: FC<DraggableTaskProps> = ({ task, openTaskPopUp }) => {
  const [, drag] = useDrag({
    type: "TASK",
    item: { task },
  })

  return (
    <div
      ref={drag}
      className="bg-blue-500 text-white text-xs rounded-md px-2 py-1 truncate flex-shrink-0 hover:cursor-pointer"
      style={{ background: task.color }}
      onClick={() => openTaskPopUp(task.id)}
    >
      {task.name}
    </div>
  )
}

export default DraggableTask
