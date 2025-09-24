import { useState } from 'react'
import { AskedQuestionType, GetAskedQuestionsResponse } from '@/types/AskedQuestion'
import { useAskedQuestionStore } from '@/store/askedQuestions-store'
import api from '@/apis/api'

export const useAskedQuestions = () => {
    const {
        askedQuestions,
        setAskedQuestions,
        // create,
        update,
        getAskedQuestionsById,
        delete: deleteAskedQuestion,
    } = useAskedQuestionStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getAskedQuestions = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<GetAskedQuestionsResponse>('/faqs/all')
            console.log("Resposta do backend:", response.data);
            setAskedQuestions(response.data.data)
        } catch (err) {
            const message = "Erro na tentativa de buscar perguntas frequentes";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createAskedQuestion = async (question: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(`/faqs/create`,
                {
                    question
                })
            console.log("Resposta bruta do backend:", response.data);

            if (response.data.success) {
                await getAskedQuestions() // recarrega a lista do backend
                return true
            }
            throw new Error("Erro ao criar pergunta")
            // create(response.data.data)
            // return response.data
        } catch (err) {
            const message = "Erro na tentativa de enviar dúvida";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const updateAskedQuestion = async (askedQuestion: AskedQuestionType) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.put<AskedQuestionType>(
                `/faqs/answer/${askedQuestion.id}`,
                { answer: askedQuestion.answer },
            )
            update(response.data)
            return response.data
        } catch (err) {
            setError('Erro na tentativa de responder pergunta')
        } finally {
            setLoading(false)
        }
    }

    const deleteAskedQuestionById = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`/faqs/delete/${id}`)
            deleteAskedQuestion(id)
        } catch (err) {
            setError('Erro na tentativa de deletar pergunta')
        } finally {
            setLoading(false)
        }
    }

    return {
        askedQuestions,
        loading,
        error,
        getAskedQuestions,
        getAskedQuestionsById,
        createAskedQuestion,
        updateAskedQuestion,
        deleteAskedQuestionById,
    }
}