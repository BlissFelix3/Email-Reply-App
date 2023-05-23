export interface AuthResponseSignup {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface AuthResponseLogin {
  accessToken: string;
  username: string;
}
