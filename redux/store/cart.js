import { getProductById } from "../../product.js";

//actions
export const addCart = 'ADD_CART'
export const removeCart = 'REMOVE_CART'
export const emptyCart = 'EMPTY_CART'

//action reducer
const initialState = {
    cartItems: [],
    cartTotalCost: 0,
    couponApplied: false,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case addCart: {
            const product = getProductById(action.id)
            const newState = {
                ...state,
                cartItems: [...state.cartItems, product],
                cartTotalCost: state.cartTotalCost + product.price,
            }
            return newState;
        }
        case removeCart: {
            const newCartItems = state.cartItems.filter(product => product.id !== action.id)
            return {
                ...state,
                cartItems: newCartItems,
            }
        }
        case emptyCart: {
            return {
                ...state,
                cartItems: [],
                cartTotalCost: 0,
            }
        }
        default: {
            return state
        }
    }
}


//action creators
export const addCartAction = (id) => {
    return {
        type: addCart,
        id: id
    }
}

export const removeCartAction = (id) => {
    return {
        type: removeCart,
        id: id
    }
}

export const emptyCartAction = () => {
    return {
        type: emptyCart,
    }
}

export default cartReducer