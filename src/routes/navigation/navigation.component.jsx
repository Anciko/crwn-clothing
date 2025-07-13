import { Link, Outlet } from 'react-router-dom'
import "./navigation.styles.scss";
import Logo from "../../assets/crown.svg"
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { auth, singOutAuthUser } from '../../utils/fireabase/firebase.util';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

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

                </div>
            </div >
            <Outlet />
        </>
    )
}

export default Navigation