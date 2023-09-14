export interface ILoginParams {
    username: string
    password: string | number
}
export interface ILoginApi {
    login: (params: ILoginParams) => Promise<any>
}

export interface IRoutepi {
    fetchRoute: (params: any) => Promise<any>
}