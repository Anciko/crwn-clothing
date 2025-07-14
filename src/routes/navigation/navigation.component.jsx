import { Link, Outlet } from 'react-router-dom'
import Logo from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';

import { auth, singOutAuthUser } from '../../utils/fireabase/firebase.util';

import "./navigation.styles.scss";


const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const handleSignOut = async () => {
        await singOutAuthUser(auth);
        setCurrentUser(null);
    }

    return (
        <>
            <div className="navigation">
                <Link to="/" className='logo-container'>
                    <img src={Logo} alt="" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">
                        SHOP
                    </Link>

                    {
                        currentUser ? (
                            <span onClick={handleSignOut} className='nav-link'>SIGN OUT</span>
                        ) : (
                            <Link to="/auth" className="nav-link">
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {
                    isCartOpen && <CartDropdown />
                }

            </div >
            <Outlet />
        </>
    )
}

export default Navigation