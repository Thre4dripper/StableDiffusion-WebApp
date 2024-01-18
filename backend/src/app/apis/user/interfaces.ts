export interface IRegisterUser {
    firstName: string,
    lastName: string,
    email: string
    password: string
}

export interface ILoginUser {
    email: string
    password: string
}