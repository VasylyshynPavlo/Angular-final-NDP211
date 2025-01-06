export interface User {
    avatarUrl: string | undefined,
    username: string,
    fullName: string | undefined,
    email: string,
    emailConfirmed: boolean,
}