import { Outlet, ScrollRestoration } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster />
    </>
  )
}