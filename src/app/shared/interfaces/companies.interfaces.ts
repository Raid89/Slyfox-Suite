import { ICreateUser } from "./users.interfaces";

// It includes interfaces for creating a company with a user, the company details, and the success response after creation.
export interface ICreateCompanyWithUser {
  company: ICreateCompany;
  user:    Omit<ICreateUser, 'company' | 'product' | 'modules'>;
}

export interface ICreateCompany {
  name:              string;
  subscription_plan: string;
  email:             string;
  nit:               string;
  address:           string;
  phone:             string;
}

export interface ICreateCompanySuccess {
  success: boolean;
  data:    ICreateCompanySuccessData;
}

export interface ICreateCompanySuccessData {
  company_id:      number;
  user_id:         number;
  company_user_id: number;
}

