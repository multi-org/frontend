import { Navigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { useAuth } from "@/hooks/auth-hooks"

type UserProtectedRouteProps = {
  children: React.ReactNode
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {

  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="text-center p-4 h-screen w-full flex justify-center items-center"><Loader className="h-20 w-20 text-gray-400 animate-spin" /></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}