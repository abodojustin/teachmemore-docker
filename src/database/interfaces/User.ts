import { UserRole } from "../models/User";

export interface IUser {
  _id: any;
  name: string;
  first_name: string;
  code: number;
  last_name: string;
  title: string;
  function: string;
  phone_number: number;
  date_naiss: string;
  gender: string;
  role: string;
  checked: boolean;
  is_active: boolean;
  language: string;
  name_enterprise: Object;
  email: string;
  questionnaires_fullfilled: string[];
  niveau: Array<Object>;
  password: string;
}
