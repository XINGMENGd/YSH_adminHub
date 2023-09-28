export interface createProductParams {
    name: string
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
    name: string
    description: string
    price: number
    stock: number
    category: number | string
    status: number | string
    imageArray: Array<string>
    sellerId: number
    updated_at?: string
}