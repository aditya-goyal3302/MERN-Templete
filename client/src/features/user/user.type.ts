export type loginApiPayload = {
  email: string,
  password: string,
}

export type InitUser = {
  uuid: string,
  name: string,
  last_name: string,
  role: string,
  email: string,
  department: string,
  company_id: string,
  is_valid: string,
  username: string,
  joins_at: string,
  pincode: number,
  state: string,
  city: string,
  street: string,
  date_of_birth: string,
  country: string,
  phone: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  User_role: {
    uuid: string,
    role_type: string,
  },
  Company_detail: {
    uuid: string,
    name: string,
  }
}

export type loginApiResponse = {
  response: {
    status: number
  }
  user: InitUser
  token: string
}
export type initialState = {
  token: string,
  error: boolean,
  user: InitUser,
  allUsers: InitUser[] | null,
  isLoading: false | true,
  isLogedin: false | true
}
