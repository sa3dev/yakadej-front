import { Company } from 'src/app/services/company/company.model';

export interface APIFoodFamilly {
    famillyCode: number;
    items: APIFoodItem[];
}

export interface APIAdvert {
  id: number;
  dateStart: string;
  hourStart: string;
  dateEnd: string;
  hourEnd: string;
  image: string;
  families: number[];
}

export interface APIFoodItem {
    id: number;
    label: string;
    description: string;
    allergens: string[];
    ingredients: {
        items: string;
        details: string;
    };
    price: number;
    iconsUrl: {
        logo: string;
        details: string;
        appli: string
    };
    about: {
        vegie: boolean;
        glutenFree: boolean;
        homeMade: boolean;
        bio: boolean;
    };
    cookingInformations: string;
    familly: number;
    menus: number[];
    sticker: string;
    stock: number;
    isPromo: boolean;
    sup: number;
    order: number;
}

export interface APIFoodItemType {
    famillyCode: number;
    iconsUrl: string;
    label: string;
}

export interface APIPlanning {
    deilveryAvailableToday: boolean;
    deliveryDates: APIPlanningDate[];
    deliveryTimes: APIPlanningTime[];
}

export interface APIPlanningDate {
    date: string;
    isAvailable: boolean;
}

export interface APIPlanningTime {
    id: number;
    label: string;
    isActive: boolean;
}

export interface Order {
    id: number;
    prices: {
        ht: number;
        ttc: number;
        promo: {
            ht: number;
            ttc: number;
        }
    };
    company: Company;
    date: string;
    cart: {
        id: number;
        itemCount: number;
        items: OrderItem[]
    };
}

export interface OrderItem {
    id: string;
    label: string;
    price: number;
    logo: string;
    details: any;
    quantity: number;
}

export interface FoodMenu {
    menuId: number | string;
    mainEntryId: number;
    dessertId: number;
    drinkId: number;
}

export interface OrderHistory {
    id: number;
    dailyId: number;
    isValid: boolean;
    hasBeenCanceled: boolean;
    isPayed: boolean;
    bill: string;
    estimatedDelivery: string;
    realDelivery: string;
    price: number;
    companyId: number;
}

export interface PayzenSignature {
    url: string;
    form: {
        vads_page_action: string;
        vads_amount: number;
        vads_currency: number;
        vads_ctx_mode: string;
        vads_cust_email: string;
        vads_action_mode: string;
        vads_site_id: string;
        vads_trans_date: string;
        vads_version: string;
        vads_trans_id: number;
        vads_payment_config: string;
        vads_order_id: number;
        vads_order_info: number;
        vads_return_mode: string;
        vads_payment_cards: string;
        signature: string;
    };
}

export interface EdenredLink {
    link: string;
}

export interface CheckStocks {
    succes: boolean;
    message: string;
}
