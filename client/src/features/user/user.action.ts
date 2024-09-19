import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { loginApiPayload, loginApiResponse, loginVerifyApiPayload } from './user.type';
import { signupService, updateEmployeeService } from '../../services/auth.service';
import { RootState } from '../../store/store';
import axiosInstance from '../../config/axios';


const authRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const LoginApi = createAsyncThunk('Auth/Login', async (payload: loginApiPayload, { rejectWithValue }) => {
  try {
    const response = await authRequest.post<loginApiResponse>('/auth/login', { ...payload })
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const VerifyLoginApi = createAsyncThunk('Auth/VerifyLogin', async (payload: loginVerifyApiPayload, { rejectWithValue }) => {
  try {
    const response = await authRequest.post<loginApiResponse>('/auth/login/verify', { ...payload })
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const signupUserData = createAsyncThunk('signup user',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await signupService(payload)
      return response.data as loginApiResponse
    } catch (error) {
      return rejectWithValue(error)
    }
  })
export const updateUserAction = createAsyncThunk('update employee', async ({ data }: any, { rejectWithValue, getState }) => {
  try {
    const response = await axiosInstance.patch(`/user`, { ...data },{
      headers: {
        Authorization: (getState() as RootState).persistedReducer.token
      }
    })
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const fetchUserData = createAsyncThunk('fetch/userdata',
  async (payload: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosInstance.get("/user", {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  })



// export const patchUserData = createAsyncThunk('patch user',
//   async (payload: object, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState
//       const response = await axiosInstance.patch("/", { ...payload }, {
//         headers: {
//           Authorization: state.persistedReducer.token
//         }
//       })
//       return response.data
//     } catch (error) {
//       rejectWithValue(error)
//     }
//   })
export const patchUserImage = createAsyncThunk('patch/userimage',
  async (payload: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosInstance.patch("user/image", payload, {
        headers: {
          Authorization: state.persistedReducer.token,
          'content-type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  })
export const deleteUserImage = createAsyncThunk('delete/useriimage',
  async (payload: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosInstance.delete("user/image", {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  })