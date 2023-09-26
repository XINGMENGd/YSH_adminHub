export interface createProductParams {
    name: string
    description: string
    price: number
    stock: number
    category: string | number
    status: string | number
    imageArray: Array<string>
    sellerId: string | number
    created_at?: string
}

export interface updateProductParams {
    name: string
    description: string
    price: number
    stock: number
    category: string | number
    status: string | number
    imageArray: Array<string>
    sellerId: string | number
    updated_at?: string
}