import { User } from "../users/user";

export interface Title{
    title: string;
    users: Array<User>;
}