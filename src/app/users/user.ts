import { Theme } from "../themes/theme";

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    contacts: Array<number> | undefined;
    contactNum: number;
    quote: string;
    secret: string;
    lastTheme: Theme | undefined;
    symbol: string;
    symbolColor: string;
    cardColor: string;
    textColor: string;
}