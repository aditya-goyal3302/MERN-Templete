import { createSlice } from "@reduxjs/toolkit";
import { deleteProductForVendor, getProductsForVendor } from "./Product.Api";
import { initialStateType, productData } from "./ProductApi.Types";


const initialState: initialStateType = {
    isLoading:false,
    error:{},
    curruntPage: 0,
    nextPage: 0,
    prevPage: 0,
    totalPages: 0,
    products: {}
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsForVendor.pending,(state,action)=>{
            state.isLoading=true;
            state.error = ''
        })
        builder.addCase(getProductsForVendor.fulfilled,(state,action)=>{
            state.isLoading=false;
            action.payload.map((item:productData)=>{
                const temp = item?._id ? item._id as string : '1';
                state.products[temp] = item
            })
        })
        builder.addCase(getProductsForVendor.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.payload 
        })
        builder.addCase(deleteProductForVendor.pending,(state,action)=>{
            state.isLoading=true;
            state.error = ''
        })
        builder.addCase(deleteProductForVendor.fulfilled,(state,action)=>{
            state.isLoading=false;
            const temp = action?.payload ? action.payload as string : '1'
            delete state.products[temp]
        })
        builder.addCase(deleteProductForVendor.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.payload 
        })
    }
})
export const {  } = ProductSlice.actions
export default ProductSlice.reducer