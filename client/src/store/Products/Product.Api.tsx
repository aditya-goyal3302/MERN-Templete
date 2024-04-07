import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { postProductReqData } from './ProductApi.Types';
import { RootState } from '../store';


const request = axios.create({
  baseURL: process.env.REACT_APP_PRODUCT_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postProduct = createAsyncThunk('products/post',
  async (payload: postProductReqData, { getState, rejectWithValue }) => {
    console.log('payload: ', payload);
    try {
      const state = getState() as RootState
      const response = await request.post('/', {
        ...payload
      }, {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response);
      // return response.data
    } catch (error) {
      console.log('error_in_addProduct: ', error);
      rejectWithValue(error)
    }
  })

export const getProductsForVendor = createAsyncThunk('product/getforvendor',
  async (payload: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const resp = await request.get('/vendor', {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      // console.log('resp: ', resp);
      return resp.data
    } catch (error) {
      console.log('error_in_getProductsForVendor: ', error);
      rejectWithValue(error)
    }
  })
export const deleteProductForVendor = createAsyncThunk('product/delete',
  async (payload:string,{getState,rejectWithValue}) => {
    try {
      const state = getState() as RootState
      const resp = await request.delete(`/${payload}`,{
        headers:{
          Authorization: state.persistedReducer.token
        }
      })
      console.log(resp);
      return (payload as string)
    } catch (error) {
      console.log('error_in_deleteProductForVendor: ', error);
      rejectWithValue(error)
    }
  })
  export const updateProduct = createAsyncThunk('products/update',
  async (payload: postProductReqData, { getState, rejectWithValue }) => {
    console.log('payload: ', payload);  
    try {
      const state = getState() as RootState
      const response = await request.put(`/${payload?.id as string}`, {
        ...payload
      }, {
        headers: {
          Authorization: state.persistedReducer.token
        }
      })
      console.log('response.data: ', response);
      // return response.data
    } catch (error) {
      console.log('error_in_addProduct: ', error);
      rejectWithValue(error)
    }
  })