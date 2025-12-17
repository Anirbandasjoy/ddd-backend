export type CreateNewUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  name?: string;
};
