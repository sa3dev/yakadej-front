import { Company } from '../services/company/company.model';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    type: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    birthDate: string;
    company: Company;
    credit: number;
    sponsorshipCode: string;
    hasEdenred: boolean;
    isValid: boolean;
    sms10h: number;
    negativeBalance: number;
}

export interface CreditCard {
    number: string;
    expirationDate: {
        month: string;
        year: string;
    };
    crypto: string;
    schema: any;
}

export interface CreditCardWithToken {
    number: string;
    expirationDate: {
        month: string;
        year: string;
    };
    token: string;
    schema: any;
}
