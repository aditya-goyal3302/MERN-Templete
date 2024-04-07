export interface productData {
  [key: string]: {
    brand?:string
    category?:string
    current_Qty?:number
    description?:string
    images?:string[]
    is_deleted?:boolean
    SUK?:string
    publisher_id?:any
    regular_price?:number
    sales_price?:number
    total_Qty?:number
    tags?:string[]
    title?:string
    _id?:string
    
  }
}
export interface postProductReqData {
  id?:string
  title: string,
  description: string,
  category: string,
  brand: string,
  SUK: string,
  Qty: number,
  Rp: number,
  Sp: number,
  tags: string[],
  images: string[]
}
export interface initialStateType {
  isLoading: boolean,
  error: any,
  curruntPage: number,
  prevPage: number,
  nextPage: number,
  totalPages: number,
  products: productData
}
export type postProductResData = { data: any, status: number } | { message: string, status: number }