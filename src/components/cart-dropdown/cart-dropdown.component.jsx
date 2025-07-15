import { useContext } from "react";
import Button from "../../components/button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../context/cart.context";

import "./cart-dropdown.styles.scss"
import { useNavigate } from "react-router-dom";

function CartDropdown() {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate();

  const goToCheckOutPage = () => {
    navigate('/check-out')
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))
        }
      </div>
      <Button onClick={goToCheckOutPage}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown