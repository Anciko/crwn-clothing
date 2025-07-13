import { useContext } from "react"
import { ProductsContext } from "../../context/products.context"

function Shop() {
    const { products } = useContext(ProductsContext);
    return (
        <>
            {
                products.map(({id, name}) => (
                    <h2 key={id}>{name}</h2>
                ))
            }
        </>
    )
}

export default Shop