export interface ILoginParams {
    username: string
    password: string | number
}
export interface ILoginApi {
    login: (params: ILoginParams) => Promise<any>
}

export interface IRouteApi {
    FetchRouteList: () => Promise<any>
}