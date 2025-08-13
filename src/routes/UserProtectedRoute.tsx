import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import api from "@/apis/api"

type UserProtectedRouteProps = {
  children: React.ReactNode
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.get("/users/me", { withCredentials: true })
        setIsAuthenticated(true)
      } catch (error) {
        console.warn("Autenticação necessária:", error);
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  if (isLoading) {
    return <div className="text-center p-4 h-screen w-full flex justify-center items-center"><Loader className="h-20 w-20 text-gray-400 animate-spin" /></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}