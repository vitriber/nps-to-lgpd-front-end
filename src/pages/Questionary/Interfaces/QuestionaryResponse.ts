import { Answer } from './AnswerInterface';

export interface QuestionaryResponse {
  name_enterprise: string;
  nps_value: number;
  answers: Answer[];
}
