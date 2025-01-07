import { FC } from "react"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const basepath = "/addax-test-task"

const router = createRouter({ routeTree, basepath })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
