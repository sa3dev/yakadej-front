export interface LoginResponse {
    userId: number;
    token: string;
}

export interface SignupResponse {
    userId: number;
    token: string;
}

export interface UpdateCredentialUser {
    email: string;
    password: string;
}
export interface UpdateUser {
    firstname: string;
    lastname: string;
    email: string;
}

export interface UpdateBodyUser {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
}

export interface NotificationPreferences {
    newsletter: {
        weekly: boolean,
        daily: boolean,
        specialOffers: boolean,
        orderConfirmation: true
    };
    textMessage: {
        deliveryUpdate: boolean,
        orderConfirmation: boolean,
        specialOffers: boolean
    };
}

export interface NotificationSms {
    sms: boolean;
}

export interface UpdatePassword {
    old: string;
    new: string;
}

export interface UpdateCompanyUser {
    userType: string;
    companyId: number;
}
