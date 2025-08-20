import { useEffect, useState } from "react"
import api from "@/apis/api"

export function useAuth() {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkSession = async () => {
            try {
                await api.get("/users/me", { withCredentials: true })
                setIsAuthenticated(true)
            } catch {
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkSession()
    }, [])

    return { isLoading, isAuthenticated }
}