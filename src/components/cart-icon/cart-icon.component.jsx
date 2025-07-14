import { useContext } from "react";
import ShoppingBag from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss"
import { CartContext } from "../../context/cart.context";

function CartIcon() {
    const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useContext(CartContext);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }



    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <img src={ShoppingBag} className="shopping-icon" alt="crwn clothing shopping bag" />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon