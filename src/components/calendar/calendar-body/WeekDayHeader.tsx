import { FC } from "react"

type WeekDayHeaderProps = {
  day: string
  isLastCol: boolean
}

const WeekDayHeader: FC<WeekDayHeaderProps> = ({ day, isLastCol }) => {
  return (
    <div
      key={day}
      className={`font-bold border-t border-l border-gray-200 ${isLastCol ? "border-r" : ""} `}
    >
      {day}
    </div>
  )
}

export default WeekDayHeader
