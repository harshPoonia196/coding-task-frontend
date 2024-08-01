export interface IUser {
  city: string;
  phone: string;
  email: string;
  state: string;
  country: string;
  lastName: string;
  firstName: string;
  postalCode: string;
  addressLine2: string;
  addressLine1: string;
}

export interface IUserState {
  loading: false;
  user: IUser;
  activeStep: number;
}

export type AuthUserRes = {
  success: boolean;
  data: IUser;
  message: string;
};
