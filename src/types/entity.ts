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

export type CartItems = Array<{
  productId: string;
  quantity: number;
  discount: number;
  productName: string;
}>;
export interface Category {
  id: string;
  name: string;
  categoryAliasName: string;
  description: string;
}

export interface Invoice {
  id: string;
  cancelDate: string;
  deliveryDate: string;
  orderDate: string;
  shippingDate: string;
  shippingStatus: string;
  status: string;
  totalAmount: number;
  customerName: string;
}


