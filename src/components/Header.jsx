import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCard";

const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/image/logo.png" alt="logo" />
          <div>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={19} src="/image/cart.svg" alt="cart" />
          <span>{totalPrice} руб</span>
        </li>
        <Link to="favorites">
          <li className="mr-10 cu-p">
            <img
              width={18}
              height={19}
              src="/image/favorite.svg"
              alt="favorite"
            />
          </li>
        </Link>
        <Link to="orders">
          <li>
            <img width={18} height={19} src="/image/user.svg" alt="user" />
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
