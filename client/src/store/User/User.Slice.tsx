import { createSlice } from "@reduxjs/toolkit";
import { LoginApi, fetchUserData } from "./User.Api";
import { initialState } from "./UserApi.Types";

const initUser ={
    _id: '',
    name: '',
    role_id: '',
    role:'',
    image: '',
    email: '',
    pincode:0,
    address:'',
    city:'',
    country: '',
    state:'',
    fax:0,
    phone_no:'',
  }
const init:initialState = {
    token: '',
    error:false,
    user:initUser ,
    isLoading: false,
    isLogedin: false
}
const UserSlice = createSlice({
    name: 'User',
    initialState:init,
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user=initUser
        },
        reset: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user=initUser
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginApi.fulfilled, (state, action) => {
            state.token = action.payload?.token || ''
            state.user = {...state.user,...action.payload?.data} 
            state.isLoading = false
            state.isLogedin = true
            state.error = false
        })
        builder.addCase(LoginApi.pending, (state, action) => {
            state.isLoading = true
            state.isLogedin = false
            state.error = false
        })
        builder.addCase(LoginApi.rejected, (state, action) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = true
        })
        builder.addCase(fetchUserData.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = {...state.user,...action.payload}
        })
    }
})
export const { logout, reset } = UserSlice.actions
export default UserSlice.reducer
