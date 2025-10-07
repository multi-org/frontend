export interface AskedQuestionType {
    id: string;
    question: string;
    answer?: string;
}

export type GetAskedQuestionsResponse = {
  success: boolean;
  data: AskedQuestionType[];
};