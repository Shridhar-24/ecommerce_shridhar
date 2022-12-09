import React, {createContext,useContext,useState,useEffect} from "react";
import {toast} from 'react-hot-toast';


const Context = createContext();
export const StateContext =({children})=>{
const [showCart, setShowCart] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const [totalQuantity, setTotalQuantity] = useState(0);
const [qty, setQty] = useState(1);




const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
            setTotalPrice((prevPrice)=> prevPrice + product.price * quantity);
            setTotalQuantity((prevTotalQuantites)=> prevTotalQuantites + quantity);
        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
            

        }
        else{
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`)
}
const remove =(item)=>{
    const index = cartItems.findIndex((product)=> product === item);
    setCartItems((prevCartItems)=> prevCartItems.filter((product)=> product !== item))
    setTotalPrice((prevTotalPrice)=> prevTotalPrice - item.price * item.quantity)
    setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity - item.quantity)
}
const toggleCartItemQuantity = (id,value) =>{
const foundProduct = cartItems.find((item)=> item._id === id);
const index = cartItems.findIndex((product)=> product._id === id);
const newCartItems = cartItems.filter((item)=> item._id !== id);
if(value==='inc'){
    console.log('foundProduct:', foundProduct)
    const newProductInc = {...foundProduct, quantity: foundProduct.quantity+1}
    
    setCartItems([...newCartItems,newProductInc]) //product ki jagah foundProtuct mere khyal se  ... //Finally mai sahi tha :D ;)Z
    setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price )
    setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity + 1)
}
else if(value === 'desc'){
    console.log('foundProduct:', foundProduct)
    if(foundProduct?.quantity > 1){
        const newProductDec = {...foundProduct, quantity: foundProduct.quantity-1}
        setCartItems([...newCartItems,newProductDec])
        setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price )
        setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity - 1) 
    }
}
}

const incQty =()=>{
    setQty((prevQty) => prevQty+1);
}

const decQty =()=>{
    setQty((prevQty)=>{
        if((prevQty -1) < 1) return 1;

        return (prevQty -1);
    });
}

return(
    <Context.Provider value={{ setCartItems, setTotalPrice, setTotalQuantity,remove,showCart,setShowCart,cartItems,totalPrice,totalQuantity,qty,incQty,decQty,onAdd,toggleCartItemQuantity  }}>
        {children}
    </Context.Provider>
)

}

export default Context;

