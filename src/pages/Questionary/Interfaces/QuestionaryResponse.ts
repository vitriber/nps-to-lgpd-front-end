import { Answer } from './AnswerInterface';

export interface QuestionaryResponse {
  name_enterprise?: string | undefined;
  nps_value?: number | undefined;
  answers?: Answer[];
}
