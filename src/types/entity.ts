export interface Product {
    id: string;
    name: string;
    productNameAlias: string;
    price: number;
    description: string;
    categoryId: string;
    productDate: string;
    imageUrl: string;
    discount: number;
    views: number;
    supplierId: number;
    imageFile?: File;
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