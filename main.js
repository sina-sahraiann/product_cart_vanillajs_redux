import { getCoupanById, products } from "./product.js"
import cartReducer, { addCartAction, emptyCart, emptyCartAction } from "./redux/store/cart.js"
import purchaseReducer, { addPurchaseAction } from "./redux/store/purchase.js"

//getting dom elements
const product_container = document.querySelector("#product_container")
const cart_container = document.querySelector("#cart_container")
const total_amount = document.querySelector("#total_amount")
const purchase_btn = document.querySelector("#purchase_btn")
const purchases_container = document.querySelector("#purchases_container")
const coupanId_input = document.querySelector("#coupanId_input")

//creating the store
const marketStore = Redux.createStore(Redux.combineReducers(
    {
        cart: cartReducer,
        purchases: purchaseReducer
    }
))

console.log(marketStore.getState());

//event to dispatch addCartAction to store
const addToCartHandler = (id) => {
    marketStore.dispatch(addCartAction(id))
    generateCartList()
}

//event handler for purchase button
purchase_btn.addEventListener('click', () => {

    if (marketStore.getState().cart.cartItems.length == 0) {
        alert('your cart is empty')
        return
    }

    let cartToSend = marketStore.getState().cart
    if (getCoupanById(coupanId_input.value)) {
        cartToSend = {
            ...cartToSend,
            coupanApplied: true,
            coupanPrice: getCoupanById(coupanId_input.value)
        }
    } else {
        cartToSend = {
            ...cartToSend,
            coupanApplied: false,
            coupanPrice: getCoupanById(coupanId_input.value)
        }
    }
    
    marketStore.dispatch(addPurchaseAction(cartToSend))
    marketStore.dispatch(emptyCartAction())
    generateCartList()
    generateTransactionList()
})

//so dom can access the function
window.addToCartHandler = addToCartHandler

//to render list of products
const generateProductList = () => {
    product_container.innerHTML = products.map(product => {
        return (
            `
            <li class="card" style="width: 200px;">
                    <div class="card-body ">
                        <h4 class="card-title">${product.name}</h4>
                        <p class="card-text">${product.price}</p>
                        <a href="#" class="btn btn-primary" onclick=addToCartHandler("${product.id}")>add to cart</a>
                    </div>
            </li>
            `
        )
    })
}

//generate the product list immeadietly
generateProductList()

//render the cart list in dom
const generateCartList = () => {
    cart_container.innerHTML = marketStore.getState().cart.cartItems.map((item) => {
        return (
            `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        </tr>
            `
        )
    })

    total_amount.innerHTML = 'total amount : ' + marketStore.getState().cart.cartTotalCost
}

//generate transaction list in dom
const generateTransactionList = () => {
    purchases_container.innerHTML = marketStore.getState().purchases.map((purchase) => {
        const itemNames = purchase.cartItems.map((item) => item.name)
        return (
            `
            <tr>
                <td>${itemNames.join(', ')}</td>
                <td>${purchase.coupanApplied}</td>
                <td>${purchase.moneySpend}</td>
                <td>${(new Date).toLocaleDateString()}</td>
              </tr>
            `
        )
    })
}


