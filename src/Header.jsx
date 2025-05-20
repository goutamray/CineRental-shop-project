import { useContext, useState } from "react";

// import images
import logo from "./assets/logo.svg";
import ring from "./assets/ring.svg";
import moon from "./assets/icons/moon.svg";
import sun from "./assets/icons/sun.svg";
import cart from "./assets/shopping-cart.svg";
import CartDetails from "./cine/CartDetails";
import { MovieContext, ThemeContext } from "./context";

export default function Header() {
  const [showCart, setShowCart] = useState(false);

  const { state } = useContext(MovieContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // handle show cart details
  function handleShowCartDetails() {
    setShowCart(true);
  }

  // hide cart detils
  function handleHideDetails() {
    setShowCart(false);
  }

  return (
    <>
      <header>
        {showCart && <CartDetails onHideCart={handleHideDetails} />}
        <nav className="container flex items-center justify-between space-x-10 py-6">
          <a href="index.html">
            <img src={logo} width={139} height={26} alt="" />
          </a>
          <ul className="flex items-center space-x-5">
            <li>
              <a
                className="bg-[#cdf8de] dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
              >
                <img src={ring} width={24} height={24} alt="" />
              </a>
            </li>
            <li>
              <a
                className="bg-[#cdf8de] dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
                onClick={() => setDarkMode(!darkMode)}
              >
                <img
                  src={darkMode ? sun : moon}
                  width={24}
                  height={24}
                  alt=""
                />
              </a>
            </li>
            <li className="relative">
              <a
                className="bg-[#cdf8de] dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                href="#"
                onClick={handleShowCartDetails}
              >
                <img src={cart} width={24} height={24} alt="" />
              </a>
              {state.cartData?.length > 0 && (
                <span className="cutstom-cart absolute rounded-full left-[28px] leading-6 top-[-12px] text-white text-center p-2 h-[30px] w-[30px] bg-[#12cf6f]">
                  {" "}
                  {state.cartData?.length}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
