export interface DeliveryOptions {
    isTodayAvailable: boolean;
    dates: DeliveryDateOption[];
}

export interface DeliveryDateOption {
    date: string;
    isAvailable: boolean;
}
