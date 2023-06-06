//list of all product
export const products = [
    {
        id: '0',
        name: 'sony monitor',
        price: 50000,
    },
    {
        id: '1',
        name: 'JBL speaker',
        price: 30000,
    }
]

//list of coupans
const coupanList = [
    {
        id: '1',
        priceOff: 10000,
    },
    {
        id: '2',
        priceOff: 5000,
    }
]

//method to get a product by its id
export const getProductById = (productId) => {
    return products.find(product => product.id === productId)
}

//method to get a coupan by its id
export const getCoupanById = (coupanId) => {
    if (!coupanList.find(coupan => coupan.id === coupanId)) {
        return 0
    }
    const coupan = coupanList.find(coupan => coupan.id === coupanId)
    return coupan.priceOff
}