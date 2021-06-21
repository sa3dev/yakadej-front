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
}
