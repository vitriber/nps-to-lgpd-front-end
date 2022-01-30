export interface Question {
  id: number;
  name: string;
  constant_factor: number;
  description: string;
  created_at: Date;
  is_multiple: boolean;
  updated_at?: Date;
}
