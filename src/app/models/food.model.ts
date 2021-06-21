export interface FoodItem {
    id: number;
    label: string;
    description: string;
    allergens: string[];
    ingredients: {
        items: string;
        details: string;
    };
    price: number;
    iconUrl: string;
    about: {
        vegie: boolean;
        glutenFree: boolean;
        homeMade: boolean;
        bio: boolean;
    };
    cookingInformations: string;
    familly: number;
    sticker: string;
    stock: number;
    isPromo: boolean;
    sup: number;
    order: number;
}

export interface FoodType {
    label: string;
    code: number;
    iconsUrl: string[];
}

export class FoodTypes {
    static MAIN_ENTRY: FoodType = {
        label: 'Plats chauds', code: 300,
        iconsUrl: ['/assets/icons/icons-cards/plat.svg', '/assets/icons/icons-cards/plat-active.svg']
    };
    static SALAD: FoodType = {
        label: 'Salades', code: 301,
        iconsUrl: ['/assets/icons/icons-cards/salade.svg', '/assets/icons/icons-cards/salade-active.svg']
    };
    static SANDWICH: FoodType = {
        label: 'Sandwichs', code: 296,
        iconsUrl: ['/assets/icons/icons-cards/sandwich.svg', '/assets/icons/icons-cards/sandwich-active.svg']
    };
    static LIQUIDS: FoodType = {
        label: 'Boissons', code: 298,
        iconsUrl: ['/assets/icons/icons-cards/boisson.svg', '/assets/icons/icons-cards/boisson-active.svg']
    };
    static DESSERT: FoodType = {
        label: 'Desserts', code: 299,
        iconsUrl: ['/assets/icons/icons-cards/dessert.svg', '/assets/icons/icons-cards/dessert-active.svg']
    };
    static EXTRA: FoodType = {
        label: 'Extras', code: 297,
        iconsUrl: ['/assets/icons/icons-cards/extra.svg', '/assets/icons/icons-cards/extra-active.svg']
    };
    static MENU: FoodType = {
        label: 'Formules', code: 302,
        iconsUrl: ['/assets/icons/icons-cards/plat.svg', '/assets/icons/icons-cards/plat-active.svg']
    };
    static OPTIONS: FoodType = {
        label: 'Options', code: 303,
        iconsUrl: ['/assets/icons/icons-cards/extra.svg', '/assets/icons/icons-cards/extra-active.svg']
    };
    static PASTA: FoodType = {
        label: 'Pates', code: 304,
        iconsUrl: ['/assets/icons/icons-cards/sandwich.svg', '/assets/icons/icons-cards/sandwich-active.svg']
    };

}
