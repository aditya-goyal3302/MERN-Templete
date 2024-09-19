import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { loginApiPayload, loginApiResponse } from './user.type';
import { RootState } from '../../store/store';
import { signupService } from '../../services/signup.service';
import { updateEmployeeService } from '../../services/employee.service';


const authRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const userRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const LoginApi = createAsyncThunk('Auth/Login', async (payload: loginApiPayload, { rejectWithValue }) => {
  try {
    const response = await authRequest.post<loginApiResponse>('/auth/login', {
      email: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const signupUserData = createAsyncThunk('signup user',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await signupService(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  })
  export const updateUserAction = createAsyncThunk('update employee', async ({data, id}:any,{rejectWithValue}) => {
    try {
        if(!id) id ='';
        const response = await updateEmployeeService(data, id);
        return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
})
// export const fetchUserData = createAsyncThunk('fetch/userdata',
//   async (payload: string, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState
//       const response = await userRequest.get("/", {
//         headers: {
//           Authorization: state.persistedReducer.token
//         }
//       })
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   })



// export const patchUserData = createAsyncThunk('patch user',
//   async (payload: object, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState
//       const response = await userRequest.patch("/", { ...payload }, {
//         headers: {
//           Authorization: state.persistedReducer.token
//         }
//       })
//       return response.data
//     } catch (error) {
//       rejectWithValue(error)
//     }
//   })
// export const patchUserImage = createAsyncThunk('patch/userimage',
//   async (payload: string, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState
//       const response = await userRequest.patch("/image", { image: payload }, {
//         headers: {
//           Authorization: state.persistedReducer.token
//         }
//       })
//       return response.data
//     } catch (error) {
//       rejectWithValue(error)
//     }
//   })
// export const deleteUserImage = createAsyncThunk('delete/useriimage',
//   async (payload: string, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState
//       const response = await userRequest.patch("/image", {}, {
//         headers: {
//           Authorization: state.persistedReducer.token
//         }
//       })
//       return response.data
//     } catch (error) {
//       rejectWithValue(error)
//     }
//   })