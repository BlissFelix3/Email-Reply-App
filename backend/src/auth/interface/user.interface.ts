export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  newUser: User;
  access_token: string;
}
export interface LoginResponseDto {
  status: string;
  message: string;
  payload: {
    userId: string;
    username: string;
    email: string;
  };
  access_token: string;
}
