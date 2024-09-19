import { createSlice } from "@reduxjs/toolkit";
import { LoginApi, updateUserAction } from "./user.action";
import { initialState, InitUser } from "./user.type";


const initUser: InitUser = {
    uuid: '',
    name: '',
    last_name: '',
    role: "",
    email: '',
    department: '',
    company_id: '',
    is_valid: '',
    username: '',
    joins_at: '',
    pincode: 0,
    state: '',
    city: '',
    street: '',
    country: '',
    phone: '',    
    created_at: '',
    updated_at: '',
    deleted_at: '',
    date_of_birth: '',
    User_role: {
        uuid: '',
        role_type: '',
    },
    Company_detail: {
        uuid: '',
        name: '',
    }
};

const init: initialState = {
    token: '',
    error: false,
    user: initUser,
    allUsers: null,
    isLoading: false,
    isLogedin: false
}
const UserSlice = createSlice({
    name: 'User',
    initialState: init,
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user = initUser
        },
        reset: (state) => {
            state.isLoading = false
            state.isLogedin = false
            state.error = false
            state.token = ''
            state.user = initUser
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginApi.fulfilled, (state, action) => {
            state.token = action.payload?.token || ''
            localStorage.setItem('token', state.token);
            state.user = { ...state.user, ...action.payload?.user }
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
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
           
        })
            .addCase(updateUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})
export const { logout, reset } = UserSlice.actions
export default UserSlice.reducer
