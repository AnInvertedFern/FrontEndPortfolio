import { User } from "../users/user";

export interface Title{
    // id: number;
    title: string;
    users: Array<User> | undefined;
}