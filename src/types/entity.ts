export interface Product {
    _id: string;
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