export interface createProductParams {
    description: string
    price: number
    stock: number
    category: number | string
    status: number | string
    files: Array<string>
    seller_id: string | number
    created_at?: string
}

export interface updateProductParams {
    description: string
    price: number
    stock: number
    category: number | string
    status: number | string
    files: Array<string>
    seller_id: string | number
    updated_at?: string
}