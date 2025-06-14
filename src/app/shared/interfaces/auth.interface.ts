export interface IAuthResponse {
  success: boolean;
  data:    IAuthDataResponse;
}

export interface IAuthDataResponse {
  refresh: string;
  access:  string;
  user_id: number;
  email:   string;
}
