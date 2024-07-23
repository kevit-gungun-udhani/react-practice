import { createContext, useState, useReducer } from "react";
import {DUMMY_PRODUCTS} from '../dummy-products'

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {}
});

function shoppingCartReducer(latestState, action){
    if(action.type === "add-item"){
        const updatedItems = [...latestState.items];
    
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
  
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
          updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
  
        return {
          items: updatedItems,
        };
    } else if(action.type === "update-item"){
        const updatedItems = [...latestState.items];
        const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
        );

        const updatedItem = {
        ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
        } else {
        updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
        items: updatedItems,
        };
    }
}


export  function CartContextProvider({children}){
    const[shoppingCartState, dispatch ]  = useReducer(shoppingCartReducer, {
        items: []
    })

   
    
      function handleAddItemToCart(id) {
        dispatch(
            {
                type: "add-item",
                payload: id
            }
        )
        
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type: "update-item",
            payload: {
                productId: productId,
                amount: amount
            }
        });
      }
    
      const cartCtx = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
      }

      return (
        <CartContext.Provider value={cartCtx}>
            {children}
        </CartContext.Provider>
      )
}