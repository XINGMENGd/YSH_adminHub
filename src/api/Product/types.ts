export interface createProductParams {
    name: string
    description: string
    price: number
    stock: number
    category: string | number
    status: string | number
    image: string
    sellerId: string | number
    created_at?: string
}