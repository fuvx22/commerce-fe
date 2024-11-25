export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    discount: number;
    stock: number;
}
export interface CartItem extends Product {
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    categoryAliasName: string;
    description: string;
}