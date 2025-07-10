import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loader } from "lucide-react"

type UserProtectedRouteProps = {
  children: React.ReactNode
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get("/api/me", { withCredentials: true })
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  if (isLoading) {
    return <div className="text-center p-4"><Loader className="animate-spin" /></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}