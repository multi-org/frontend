import api from "@/apis/api"
import { useUsersStore } from "@/store/useUsersStore"
import { UserType } from "@/types/User"
import { useState } from "react"

export const useUsers = () => {

    const {
        users,
        setUsers,
        create,
        update,
        getUserById,
    } = useUsersStore()


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const userLogin = async (user: {
        email: string;
        password: string;
    }) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.post("/users/login", {
                ...user,
            })
            return response.data // Retorna a resposta com o e-mail e mensagem
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erro ao tentar logar")
            throw new Error("Erro ao tentar logar")
        } finally {
            setLoading(false)
        }
    }

    const userLogout = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post("/users/logout", {}, {
                withCredentials: true
            })
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de realizar logout"
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createUser = async (user: {
        name: string;
        birthdate: string;
        diocese: string;
        phone: string;
        email: string;
        password: string;
    }) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.post("/users", {
                ...user,
            })
            create(response.data)
            return response.data
        } catch (err) {
            setError("Erro ao criar usuário")
            throw new Error("Erro ao criar usuário")
        } finally {
            setLoading(false)
        }
    }

    const getUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<UserType[]>("/users")
            setUsers(response.data)
        } catch (err) {
            setError("Erro ao buscar usuários")
        } finally {
            setLoading(false)
        }
    }

    const updateUserAvatar = async (image: File[]) => {
        setLoading(true)
        setError(null)
        try {

            const formData = new FormData()
            if (image && image.length > 0) {
                image.forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append('image', file)
                        console.log(`Arquivo ${index} adicionado:`, file.name, file.size)
                    } else {
                        console.error(`Item ${index} não é um File:`, file)
                    }
                })
            }

            const response = await api.put(
                `/users/changeProfileImage`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            update(response.data)
            return response.data
        } catch (err) {
            setError('Erro ao atualizar produto')
        } finally {
            setLoading(false)
        }
    }

    const confirmUserPassword = async (
        password: string,
    ) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.post("/users/confirmPassword",
                { password },
                { withCredentials: true }
            )
            return response.data
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erro ao tentar confirmar senha")
            throw new Error("Erro ao tentar confirmar senha")
        } finally {
            setLoading(false)
        }
    }

    const updateUserPassword = async (
        newPassword: string,
        passwordConfirmation: string,
    ) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.put("/users/changePassword",
                { 
                    newPassword,
                    passwordConfirmation,
                },
                { withCredentials: true }
            )
            console.log("Resposta da API:", response.data)
            return response.data
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erro ao tentar alterar senha")
            throw new Error("Erro ao tentar alterar senha")
        } finally {
            setLoading(false)
        }
    }

    return {
        users,
        createUser,
        userLogin,
        userLogout,
        getUsers,
        getUserById,
        updateUserAvatar,
        confirmUserPassword,
        updateUserPassword,
        loading,
        error,
        setError
    }

}