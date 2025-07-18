import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../context/cart.context";

function CheckoutItem({ cartItem }) {
    const { name, imageUrl, price, quantity } = cartItem;
    const { delteItemFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);


    const deleteItemHandler = () => delteItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);


    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>

            <span className='quantity'>
                <div className="arrow" onClick={removeItemHandler} >&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler} >&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={deleteItemHandler}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem