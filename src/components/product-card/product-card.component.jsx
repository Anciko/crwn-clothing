import { useContext } from 'react'
import { CartContext } from '../../context/cart.context';

import Button from "../button/button.component";

import "./product-card.styles.scss"

function ProductCard({ product }) {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={product.name} />
            <div className='footer'>
                <div className='name'>{product.name}</div>
                <div className='price'>{product.price}</div>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add To card</Button>
        </div>
    )
}

export default ProductCard