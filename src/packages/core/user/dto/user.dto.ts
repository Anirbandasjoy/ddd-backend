export type CreateNewUserDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  name?: string;
};
