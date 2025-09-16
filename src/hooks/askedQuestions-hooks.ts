import { useState } from 'react'
import { AskedQuestionType } from '@/types/AskedQuestion'
import { useAskedQuestionStore } from '@/store/askedQuestions-store'
import api from '@/apis/api'

export const useAskedQuestions = () => {
    const {
        askedQuestions,
        setAskedQuestions,
        create,
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
            const response = await api.get<AskedQuestionType[]>('/askedQuestions/all')
            setAskedQuestions(response.data)
        } catch (err) {
            const message = "Erro na tentativa de buscar perguntas frequentes";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createAskedQuestion = async (askedQuestion: {
        question: string;
        answer: string;
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(`/askedQuestions/create`,
                {
                    ...askedQuestion
                })
            create(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de criar pergunta";
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
                `/askedQuestion/${askedQuestion.id}`,
                askedQuestion,
            )
            update(response.data)
            return response.data
        } catch (err) {
            setError('Erro na tentativa de atualizar pergunta')
        } finally {
            setLoading(false)
        }
    }

    const deleteAskedQuestionById = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`/askedQuestion/${id}`)
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