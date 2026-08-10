import React, { useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.webp"
import cart_icon from "../../assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    const { getTotalCartItems } = useContext(ShopContext)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className='navbar-wrapper'>
            {/* Top Main Navbar */}
            <div className='navbar'>
                <div className="nav-logo">
                    <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={logo} alt="Logo" height="40px" />
                        <p>Shopify</p>
                    </Link>
                </div>

                {/* Meesho Style Search Bar */}
                <div className="nav-search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Try searching Saree, Kurti, Tshirts, or Shoes..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Right Action Links */}
                <div className="nav-login-cart">
                    <div className="nav-action-item download-app">
                        <span>Download App</span>
                    </div>
                    <div className="nav-action-item supplier">
                        <span>Become a Supplier</span>
                    </div>
                    
                    <Link to="/login" className="nav-action-item profile">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Profile</span>
                    </Link>

                    <Link to="/cart" className="nav-cart-container">
                        <div className="cart-icon-wrapper">
                            <img src={cart_icon} alt="Cart" height="24px" />
                            <div className="nav-cart-count">{getTotalCartItems()}</div>
                        </div>
                        <span>Cart</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Category Navigation Header */}
            <div className="sub-navbar">
                <ul className='sub-nav-menu'>
                    <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
                        <Link to="/">Women Ethnic</Link>
                    </li>
                    <li onClick={() => setMenu("womens")} className={menu === "womens" ? "active" : ""}>
                        <Link to="/womens">Women Western</Link>
                    </li>
                    <li onClick={() => setMenu("mens")} className={menu === "mens" ? "active" : ""}>
                        <Link to="/mens">Men</Link>
                    </li>
                    <li onClick={() => setMenu("kids")} className={menu === "kids" ? "active" : ""}>
                        <Link to="/kids">Kids</Link>
                    </li>
                    <li><Link to="/">Home & Kitchen</Link></li>
                    <li><Link to="/">Beauty & Health</Link></li>
                    <li><Link to="/">Jewellery & Accessories</Link></li>
                    <li><Link to="/">Bags & Footwear</Link></li>
                    <li><Link to="/">Electronics</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar