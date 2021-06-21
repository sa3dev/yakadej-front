export interface Company {
    id: number;
    name: string;
    address: {
        street: string
        more: string;
        zipCode: string;
        city: string;
    };
    location: {
        latitude: number;
        longitude: number;
    };
    deliveryMoment: string;
}

export interface RegisterCompanyBody {
    name: string;
    address: {
        street: string;
        zipCode: string;
        city: string;
    };
    employeeCount: number;
    ticketsAvailable: boolean;
    ticketsValue: number;
    contact: {
        lastName: string;
        firstName: string;
        phoneNumber: string;
        email: string;
    };
}
