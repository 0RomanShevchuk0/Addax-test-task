import { FC } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"
import MyCalendar from "../components/calendar/Calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

const Calendar: FC = () => {
  return (
    <div className="h-full">
      <MyCalendar />
    </div>
  )
}

export const Route = createLazyFileRoute("/calendar")({
  component: Calendar,
})
