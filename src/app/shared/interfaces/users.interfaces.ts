// It includes interfaces for creating a user.
export interface ICreateUser {
  email:      string;
  username:   string;
  password:   string;
  company:   string;
  product:   string;
  modules: Array<string>;
  first_name: string;
  last_name:  string;
}
