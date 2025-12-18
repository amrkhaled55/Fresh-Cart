import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import styleNavBar from './nabBar.module.css'
import { useContext } from 'react'
import { theContext } from '../AthunicatContext/AthunticatContext'
import { contextCart } from '../CartContext/CartContext'
import { wishContext } from '../WishListContext/WishListContext'

export default function NavBar() {
  const { cartItems } = useContext(contextCart)
  const { countWish } = useContext(wishContext)
  const { token, setToken } = useContext(theContext)
  const navigate = useNavigate()
  function removeTkn() {
    localStorage.removeItem("tkn")
    setToken(null)
    navigate('/login')
  }
  const navClass = ({ isActive }) =>
    `nav-link ${styleNavBar.navLink} ${isActive ? styleNavBar.active : ""}`

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand ms-4" to="/home">
          <img src={Logo} alt="freshcart logo" />
        </NavLink>

        <button
          className="navbar-toggler mb-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-expanded="true"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
<div className="d-flex justify-content-between w-100">
    {/* Middle Links */}
          {token && (
            <ul className="navbar-nav m-lg-auto mb-2 mb-lg-0">
              <li className="nav-item ms-4">
                <NavLink to="/home" className={navClass}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item ms-4">
                <NavLink to="/products" className={navClass}>
                  Products
                </NavLink>
              </li>

              <li className="nav-item ms-4">
                <NavLink to="/brands" className={navClass}>
                  Brands
                </NavLink>
              </li>

              <li className="nav-item ms-4">
                <NavLink to="/categories" className={navClass}>
                  Categories
                </NavLink>
              </li>
            </ul>
          )}

          {/* Right Side */}
          <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0 align-items-center">
            {token ? (
              <>
                {/* Wishlist */}
                <li className="nav-item ms-4 me-2 mt-1 mb-lg-1 mb-2">
                  <NavLink to="/wishlist">
                    <i className={`${styleNavBar.icons} fa-solid fa-heart position-relative`}>
                      <span style={{fontSize:"12px"}} className="badge bg-success position-absolute top-0 start-100 translate-middle px-2 py-1">
                        {countWish}
                      </span>
                    </i>
                  </NavLink>
                </li>

                {/* Cart */}
                <li className="nav-item ms-4 me-2   mb-lg-1 mb-2">
                  <NavLink to="/cart">
                    <i className={`${styleNavBar.icons} fa-solid fa-cart-shopping position-relative`}>
                      <span style={{fontSize:"12px"}} className="badge bg-success position-absolute top-0 start-100 translate-middle px-2 py-1">
                        {cartItems}
                      </span>
                    </i>
                  </NavLink>
                </li>
                {/* Social */}
                <li className="nav-item ms-3 mb-1">
                  <a href="https://www.facebook.com" target="_blank">
                    <i className={`${styleNavBar.icons} fa-brands fa-facebook`}></i>
                  </a>
                </li>

                <li className="nav-item ms-3 mb-1">
                  <a href="https://x.com" target="_blank">
                    <i className={`${styleNavBar.icons} fa-brands fa-x-twitter`}></i>
                  </a>
                </li>

                <li className="nav-item ms-3 mb-1">
                  <a href="https://www.instagram.com" target="_blank">
                    <i className={`${styleNavBar.icons} fa-brands fa-instagram`}></i>
                  </a>
                </li>

                {/* Logout */}
                <li className="nav-item ms-3 mb-1">
                  <i
                    onClick={removeTkn}
                    className={`${styleNavBar.icons} ${styleNavBar.logOut} fa-solid fa-right-from-bracket`}
                  ></i>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-3 mx-4">
                  <NavLink to="/register" className={navClass}>
                    Register
                  </NavLink>
                </li>

                <li className="nav-item ms-3 mx-4">
                  <NavLink to="/login" className={navClass}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

          </ul>
</div>
      
        </div>
      </div>
    </nav>
  )
}
