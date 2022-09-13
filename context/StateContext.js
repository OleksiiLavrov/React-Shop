import React, {createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
   const [showCart, setShowCart] = useState(false);            // hide or show cart
   const [cartItems, setCartItems] = useState([]);             // list of items in cart
   const [totalPrice, setTotalPrice] = useState(0);             // total price of items
   const [totalQuantities, setTotalQuantities] = useState(0);  // total quantity of each product in cart
   const [qty, setQty] = useState(1);                          // current quantity of items to add

   let foundProduct;

   const toggleCartItemQuantity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id);
      const newCartItems = cartItems;
 
      if (value === 'inc') {
         newCartItems.forEach(item => {
            if (item._id === foundProduct._id) {
               item.quantity += 1;
            }
         })
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            newCartItems.forEach(item => {
               if (item._id === foundProduct._id) {
                  item.quantity -= 1;
               }
            })
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
         }   
      }
      setCartItems(newCartItems);
      
   }

   const showCartOnClick = (state) => {
      setShowCart(state);
   }

   const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);  
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
   }

   const onAdd = (product, quantity) => {

      // checking if the product to add is already exist in cart
      const checkProductInCart = cartItems.find((item) => item._id === product._id);
      // adding current quantity to total and calculating the total price
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity); 
      if (checkProductInCart) {

         // the product to add is already exist in cart
         // and after next adding to cart same product will 
         // just change total quantity of itself
         // As a result, getting updated list of products in cart
         const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id) return {
               ...cartProduct,
               quantity: cartProduct.quantity + quantity,
            }
         });

         // setting updated list of products in cart
         setCartItems(updatedCartItems);
      } else {
         // changing quantity of product 
         product.quantity = quantity;

         // adding new product to already existing in cart
         setCartItems([...cartItems, {...product}])
      }
      toast.success(`${qty} ${product.name} added to the cart`);
   }

   const incQty = () => {
      // increment quantity of product
      setQty((prevQty) => prevQty + 1)
   }

   const decQty = () => {
      // decrement quantity of product
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;
         return prevQty - 1;
      })
   }


   return(
      <Context.Provider value={{
         showCart,
         cartItems,
         totalPrice,
         totalQuantities,
         qty,
         incQty,
         decQty,
         onAdd,
         showCartOnClick,
         toggleCartItemQuantity,
         onRemove,
         setShowCart
      }}>
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);