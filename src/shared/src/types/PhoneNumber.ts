export type PhoneNumber = {
  phone_number_id: number;
  user_id: number;
  phone_number: string;
  verified: boolean;
  primary: boolean;
  created_at: Date;
};
