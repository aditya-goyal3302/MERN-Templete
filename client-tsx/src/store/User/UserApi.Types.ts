export type loginApiPayload = {
  email: string,
  password: string,
}

export type loginApiResponse = {
  response:{
    status: number
  }
  data: {
    _id: string,
    name: string,
    role_id: string,
    role:string
    image: string,
    email: string,
  },
  token:string
}
export type initialState = {
  token:string,
  error:boolean,
  user: {
    _id: string,
    name: string,
    role_id: string,
    role:string
    image: string,
    email: string,
    pincode:number,
    address:string,
    city:string,
    country: string,
    state:string,
    fax:number
    phone_no:string
  },
  isLoading: false|true,
  isLogedin: false|true
}
