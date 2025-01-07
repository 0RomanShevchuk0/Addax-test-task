import { FC } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"

const Index: FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h3 className="text-3xl font-bold">Home</h3>
    </div>
  )
}

export const Route = createLazyFileRoute("/")({
  component: Index,
})
