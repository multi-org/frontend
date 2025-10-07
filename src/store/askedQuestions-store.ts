import { AskedQuestionType } from "@/types/AskedQuestion"
import { create } from 'zustand'

interface askedQuestionStoreProps {
    askedQuestions: AskedQuestionType[]
    create: (askedQuestion: AskedQuestionType) => void
    update: (askedQuestion: AskedQuestionType) => void
    delete: (id: string) => void
    setAskedQuestions: (askedQuestions: AskedQuestionType[]) => void
    getAskedQuestionsById: (id: string) => AskedQuestionType | null
}

export const useAskedQuestionStore = create<askedQuestionStoreProps>()((set, get) => ({

    askedQuestions: [],

    create: (askedQuestion) =>
        set((state) => ({
            askedQuestions: [...state.askedQuestions, askedQuestion],
        })),

    update: (updatedAskedQuestion) =>
        set((state) => ({
            askedQuestions: state.askedQuestions.map((askedQuestion) =>
                askedQuestion.id === updatedAskedQuestion.id
                    ? updatedAskedQuestion
                    : askedQuestion,
            ),
        })),

    delete: (id) =>
        set((state) => ({
            askedQuestions: state.askedQuestions.filter((askedQuestion) =>
                askedQuestion.id !== id
            ),
        })),

    setAskedQuestions: (askedQuestions) =>
        set(() => ({
            askedQuestions,
        })),

    getAskedQuestionsById: (id: string) => {
        const state = get()
        const askedQuestion = state.askedQuestions.find(
            (askedQuestion: AskedQuestionType) => askedQuestion.id === id,
        )
        return askedQuestion || null
    },

}))