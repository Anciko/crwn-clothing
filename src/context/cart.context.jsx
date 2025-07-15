import { createContext, useEffect, useState } from "react";

const deleteCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains product to add
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    // if found, increse quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }

    // return new array with modified cart items / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    // if found and quantity is equal to 1, remove that item from cart
    if (existingCartItem.quantity === 1) {
        return deleteCartItem(cartItems, productToRemove);
    }

    // return cart items and decrease quantity
    return cartItems.map(cartItem => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    deleteCartItem: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    totalCartPrice: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const cartPrice = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setTotalCartPrice(cartPrice);
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const delteItemFromCart = (productToRemove) => {
        setCartItems(deleteCartItem(cartItems, productToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, delteItemFromCart, addItemToCart, removeItemFromCart, cartItems, cartCount, totalCartPrice };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}