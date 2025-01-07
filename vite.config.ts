import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
	base: '/addax-test-task/',
  plugins: [TanStackRouterVite(), viteReact()],
})
