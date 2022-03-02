import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Drawer from "../components/Drawer/Drawer";
import Header from "../components/Header";

const Orders = ({ setCartOpened, cartOpened, cartItems, onRemoveCart }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://620fdbf2ec8b2ee2834fc1fb.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="d-flex align-center space-between justify-between mb-40">
          <h1 className="">Мои заказы</h1>
        </div>
        <div className="sneakers">
          {(isLoading ? [...Array(8)] : orders).map((card, index) => (
            <Card key={index} loading={isLoading} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
