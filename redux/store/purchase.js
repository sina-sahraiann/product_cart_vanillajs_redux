import { getCoupanById } from "../../product.js";

//actions
export const addPurchase = 'Add_PURCHASE';

//reducer
const purchaseReducer = (state=[], action) => {
    switch (action.type) {
        case addPurchase:{
            const newPurchase = {
                ...action.payload,
                cartItems : action.payload.cartItems,
                moneySpend : action.payload.cartTotalCost - action.payload.coupanPrice,
                coupanApplied : action.payload.coupanApplied
            }
            return [...state, newPurchase]
        }
        default:{
            return state
        }
            
    }
}

//action creators
export const addPurchaseAction = (payload) => {
    return {
        type : addPurchase,
        payload : payload,
    }
}

export default purchaseReducer