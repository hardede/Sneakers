import axios from "axios";
import React, { useState } from "react";
import { useCart } from "../../hooks/useCard";
import Info from "../Info";
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tax = Math.floor(totalPrice * 0.05);
  const totalPriceTax = totalPrice + tax;

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/image/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((item) => (
                <div className="cartItem" key={item.id}>
                  <img
                    className="mr-20"
                    width={70}
                    height={70}
                    src={item.imgUrl}
                    alt="Sneakers"
                  />
                  <div>
                    <p className="sneakers-name">{item.name}</p>
                    <p className="price">{item.price} руб.</p>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="removeBtn"
                    src="/image/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
              <div className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <p className="price">{totalPriceTax} руб.</p>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <p className="price">{tax} руб. </p>
                  </li>
                </ul>
                <button
                  disabled={isLoading}
                  onClick={onClickOrder}
                  className="greenButton"
                >
                  Оформить заказ <img src="/image/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Info
            title={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isComplete ? "/image/completeOrder.jpg" : "/image/emty.png"}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
