import { Theme } from "../themes/theme";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    contacts: Array<number>;
    contactNum: number;
    quote: string;
    secret: string;
    lastTheme: number;
    symbol: string;
    symbolColor: string;
    cardColor: string;
    textColor: string;

    symbolBackgroundColor:string;
}