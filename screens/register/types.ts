import { Gender } from '../../providers/user-provider/types';

export interface RegisterData {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  age: string | null;
  gender: Gender | '';
  phonenumber: string | null;
}

export interface RegisterDataWithRepeatPassword extends RegisterData {
  repeatPassword: string | null;
}
