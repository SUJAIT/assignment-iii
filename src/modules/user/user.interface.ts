export const USER_ROLE = {
    user: 'user',
    admin: 'admin',
  } as const;

export interface IUser {
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
    isBlocked: boolean,
    createdAt: Date ,
    updatedAt:Date
}