import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import {   } from '../store';


const authRequest = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const userRequest = axios.create({
  baseURL: process.env.REACT_APP_USER_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const LoginApi = createAsyncThunk('Auth/Login', async (payload, { rejectWithValue }) => {
  try {
    const response = await authRequest.post('/login', {
      email: payload.email,
      password: payload.password,
    })
    console.log('response.data: ', response.data);
    return response.data
  } catch (error) {
    console.log('error_in_login_thunk: ', error);
    return rejectWithValue(error)
  }
})
export const fetchUserData = createAsyncThunk('fetch/userdata',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState() 
      const response = await userRequest.get("/", {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response.data);
      return response.data
    } catch (error) {
      console.log('error_in_fecth_user_thunk: ', error);
      rejectWithValue(error)
    }
  })

export const patchUserData = createAsyncThunk('patch user',
  async (payload,{getState,rejectWithValue}) => {
    try {
      const state = getState() 
      const response = await userRequest.patch("/",{...payload}, {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response.data);
      return response.data
    } catch (error) {
      console.log('error: ', error);
      rejectWithValue(error)
    }
  })
  export const patchUserImage = createAsyncThunk('patch/userimage',
  async (payload,{getState,rejectWithValue}) => {
    console.log('payload: ', payload);
    try {
      const state = getState()
      const response = await userRequest.patch("/image",{image:payload}, {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response.data);
      return response.data
    } catch (error) {
      console.log('error: ', error);
      rejectWithValue(error)
    }
  })
  export const deleteUserImage = createAsyncThunk('delete/useriimage',
  async (payload,{getState,rejectWithValue}) => {
    console.log('payload: ', payload);
    try {
      const state = getState() 
      const response = await userRequest.patch("/image",{}, {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response.data);
      return response.data
    } catch (error) {
      console.log('error: ', error);
      rejectWithValue(error)
    }
  })