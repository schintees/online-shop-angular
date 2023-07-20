export interface Order {
    id?: string;
    customerId: string,
    products: OrderProduct[]
}

export interface OrderProduct {
    productId: string;
    quantity: number
}
