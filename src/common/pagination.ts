import { Paginator } from "./interfaces/pagination.interface"
import { Base_Url } from "./url"

export function pagination<T>(data:Array<T>,page:number,limit:number,url:string) :Paginator<T> {
  const startIndex=(page-1) * limit
  const endIndex=page * limit
  const dataInCurrentPage=data.slice(startIndex,endIndex)
  const count=data.length
  const pageNumber=Math.ceil(count/limit)
  const currentPage=page
  const nextPage=`${Base_Url}/${url}?page=${+page<pageNumber?+page+1:page}?limit=${limit}`
  const previousPage=`${Base_Url}/${url}?page=${+page>=0?+page-1:+page}?limit=${limit}`

  return {
    data:dataInCurrentPage,
    currentPage,
    dataCount:count,
    nextPage,
    previousPage

  }
}