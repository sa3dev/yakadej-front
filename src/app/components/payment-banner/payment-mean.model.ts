export interface PaymentMean {
    icon: string;
    type: PaymentMeanType;
    label: string;
    subLabel: string;
}

export enum PaymentMeanType {
    ACCOUNT,
    CARD,
    RESTO
}
