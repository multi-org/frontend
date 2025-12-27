import { AxiosError } from "axios"

export function getApiErrorMessage(
  error: unknown,
  fallback = "Erro inesperado"
): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      fallback
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}