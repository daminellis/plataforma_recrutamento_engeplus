export type AuthLogin = {
  access_token: string;
  user: UserType;
};

export type UserType = {
  id: number;
  username: string;
  nomeCompleto: string;
  email: string;
  setor: string;
  cargo: string;
  routes: Permissions[];
};

type Permissions = {
  hasAccess: boolean;
  route: string;
};

export type LocalStorageToken = {
  expires: Date;
  token: string;
};
