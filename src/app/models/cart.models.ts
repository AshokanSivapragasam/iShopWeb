export interface CartModel {
    id: string;
    cartItems: CartItemModel[];
}

export interface CartItemModel {
    id: number;
    productId: string;
    productTitle: string;
    productImages: any;
    quantity: number;
}