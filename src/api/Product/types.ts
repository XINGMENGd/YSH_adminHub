export interface createProductParams {
    description: string
    price: number
    stock: number
    category: number | string
    status: number | string
    imageArray: Array<string>
    sellerId: number
    created_at?: string
}

export interface updateProductParams {
    description: string
    price: number
    stock: number
    category: number | string
    status: number | string
    imageArray: Array<string>
    sellerId: number
    updated_at?: string
}