import { FC } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"
import "react-big-calendar/lib/css/react-big-calendar.css"
import CalendarPage from "../pages/СalendarPage"

const Calendar: FC = () => {
  return (
    <div className="h-full">
      <CalendarPage />
    </div>
  )
}

export const Route = createLazyFileRoute("/calendar")({
  component: Calendar,
})
