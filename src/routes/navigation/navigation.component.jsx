import { Link, Outlet } from 'react-router-dom'
import "./navigation.styles.scss";
import Logo from "../../assets/crown.svg"

const Navigation = () => {
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
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation