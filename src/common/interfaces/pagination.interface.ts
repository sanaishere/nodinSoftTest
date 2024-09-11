export interface Paginator <T>{
    data: Array<T>
    nextPage:string
    previousPage:string
    currentPage:number
    dataCount:number

}